import React from "react";
import FirebaseContext from "../../firebase/context";
import LinkItem from "./LinkItem";

function SearchLinks() {
  const { firebase } = React.useContext(FirebaseContext);
  const [filteredLinks, setfilteredLinks] = React.useState([]);
  const [links, setLinks] = React.useState([]);
  const [filter, setfilter] = React.useState("");
  function handleSearch(e) {
    e.preventDefault();
    const query = filter.toLowerCase();
    const matchedLinks = links.filter((link) => {
      return (
        link.description.toLowerCase().includes(query) ||
        link.url.toLowerCase().includes(query) ||
        link.postedBy.name.toLowerCase().includes(query)
      );
    });
    setfilteredLinks(matchedLinks);
  }

  React.useEffect(() => {
    getInitialLinks();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function getInitialLinks() {
    firebase.db
      .collection("links")
      .get()
      .then((snapshot) => {
        const links = snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setLinks(links);
      });
  }

  return (
    <div>
      <div className="pageTitle">SEARCH</div>
      <hr />
      <form onSubmit={handleSearch}>
        <div className="flex items-start">
          <input
            className="inputSearch"
            placeholder="Enter Keyword"
            value={filter}
            onChange={(event) => setfilter(event.target.value)}
          />
          <button className="buttonSearch">Search</button>
        </div>
      </form>
      {filteredLinks.map((filteredLink, index) => (
        <LinkItem
          key={filteredLink.id}
          showCount={false}
          link={filteredLink}
          index={index}
        />
      ))}
    </div>
  );
}

export default SearchLinks;
