import React, { useState } from "react";
import Accordion from "./components/Accordion";
import Search from "./components/Search";
import Dropdown from "./components/Dropdown";
import Translate from "./components/Translate";
import Route from "./components/Route";
import Header from "./components/Header";

const items = [
  {
    title: "What is React?",
    content: "React is a front end javascript framework",
  },
  {
    title: "Why use React?",
    content: "React is a favourite",
  },
  {
    title: "How do you use React?",
    content: "You use React to build components.",
  },
];

const options = [
  {
    label: "The colour red",
    value: "Red",
  },
  {
    label: "The colour green",
    value: "Green",
  },
  {
    label: "The colour blue",
    value: "Blue",
  },
];

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [selected, setSelected] = useState(options[0]);
  return (
    <div>
      <Header />
      <Route path="/">
        <Accordion items={items} />
      </Route>
      <Route path="/list">
        <Search />
      </Route>
      <Route path="/dropdown">
        <Dropdown
          label="Select a colour"
          options={options}
          selected={selected}
          onSelectedChange={setSelected}
        />
      </Route>
      <Route path="/translate">
        <Translate />
      </Route>
    </div>
  );
};
