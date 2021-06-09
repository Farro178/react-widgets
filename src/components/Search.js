import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);

  console.log(results);

  useEffect(() => {
    const wikiSearch = async () => {
      const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: term,
        },
      });

      setResults(data.query.search);
    };

    if (term && !results.length) {
      wikiSearch();
    } else {
      // A timeout for the search, so api calls aren't instantaneous and it waits for user input
      const timeoutId = setTimeout(() => {
        // if term has a value, it will search
        if (term) {
          wikiSearch();
        }
      }, 500);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [term]);

  /*
    I needed to turn a string into jsx to get this result correctly which is reasoning for inner html.
    This could lead to an xss (cross site scripting) attack as this is not advised. 
    This happens because I am getting html from an unknown source which can allow malicious code to be executed inside code.

    Ultimately, don't do this if you don't trust the source for the api call ie wikipedia.
    As this is a practice application, I am leaving it here.
  */
  const renderedResults = results.map((result) => {
    return (
      <div key={result.pageid} className="item">
        <div className="right floated content">
          <a
            className="ui button"
            href={`https://en.wikipedia.org?curid=${result.pageid}`}
          >
            Go
          </a>
        </div>
        <div className="content">
          <div className="header">{result.title}</div>
          <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Term</label>
          <input
            className="input"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="ui celled list">{renderedResults}</div>
    </div>
  );
};

export default Search;