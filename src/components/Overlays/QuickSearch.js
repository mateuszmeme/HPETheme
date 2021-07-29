import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Drop, Text, TextInput } from "grommet";
import { Search } from "grommet-icons";
import parse from "html-react-parser";
import { apiFetch } from "../../data/apiFetch";
import useDebounce from "../customHooks/useDebounce";

const QuickSearch = () => {
  // Search Value
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [PersonalResultsSlice, setPersonalResultsSlice] = useState(0);
  const [IWTSlice, setIWTSlice] = useState(0);

  // Drop Reference
  const boxRef = useRef();
  //Drop Suggestions
  const [dropSuggestion, setDropSuggestion] = useState(false);

  const debouncedSearchTerm = useDebounce(value, 200);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      apiFetch(debouncedSearchTerm).then((results) => {
        setIsSearching(false);
        if(results.PersonalResults.length !== 0 && results.IWT.suggests.length !== 0
          && results.Queries.length !== 0) {
            setResults(results);
            console.log(results);
        } else {
          setResults([]);
        } 
      });
    } else {
      setResults([]);
    }
  }, [debouncedSearchTerm]);

  // SideBar Close
  const onClose = () => setDropSuggestion(!dropSuggestion);

  const handleSearchChange = (e) => {
    setValue(e.target.value);
    console.log(e.target.value);
    setDropSuggestion(true);
  };

  const options = {
    replace: (domNode) => {
      if (domNode.attribs && domNode.attribs.class === "remove") {
        return <></>;
      }
    },
  };

  // console.log(results.PersonalResults);

  const Suggestions = () => {
    let e = results;
    return (
      dropSuggestion && (
        <Drop
          align={{ top: "bottom" }}
          onClickOutside={onClose}
          onEsc={onClose}
          target={boxRef.current}
          responsive={true}
          width="20%"
        >
          {isSearching === true ? (
            <Box
              pad={{ vertical: "small" }}
              gap="small"
              width="90%"
              height="70%"
              flex
              direction="column"
              align="start"
              overflow={{ vertical: "auto", horizontal: "hidden" }}
            >
              <Text size="medium" style={{ width: "100%" }} textAlign="center">
                Searching
              </Text>
            </Box>
          ) : results.length !== 0 ? (
            <Box
              pad={{ vertical: "small" }}
              gap="small"
              width="100%"
              height="70%"
              flex
              direction="column"
              align="start"
              overflow={{ vertical: "auto", horizontal: "hidden" }}
            >
              {e.PersonalResults.length !== 0 ? (
                <>
                  <Text
                    margin={{ horizontal: "small" }}
                    size="medium"
                    style={{ width: "100%" }}
                  >
                    Quick Links
                  </Text>
                  {e.PersonalResults.slice(0, 4).map((e) => (
                    <Button
                      alignSelf="start"
                      plain
                      margin={{ left: "medium" }}
                      focusIndicator={false}
                      size="small"
                      href={e.Url}
                      target={null}
                      key={e.TypeID}
                    >
                      {console.log(e)}
                      <Box flex direction="row" align="center">
                        <Text
                          size="small"
                          margin={{ horizontal: "small", vertical: "xsmall" }}
                        >
                          {parse(e.HighlightedTitle, options)}
                        </Text>
                      </Box>
                    </Button>
                  ))}
                </>
              ) : (
                ""
              )}

              {e.IWT.suggests.length !== 0 ? (
                <>
                  <hr
                    color="BBBBBB"
                    style={{
                      width: "100%",
                    }}
                  />
                  <Text
                    margin={{ horizontal: "small" }}
                    size="medium"
                    style={{ width: "100%" }}
                  >
                    I Want To
                  </Text>
                  {e.IWT.suggests[0].list.slice(0, 4).map((e) => (
                    <Button
                      alignSelf="start"
                      plain
                      margin={{ left: "medium" }}
                      focusIndicator={false}
                      size="small"
                      href={e.href}
                      target={null}
                      key={e.title}
                    >
                      <Box flex direction="row" align="center">
                        <Text
                          size="small"
                          margin={{ horizontal: "small", vertical: "xsmall" }}
                        >
                          {parse(e.title, options)}
                        </Text>
                      </Box>
                    </Button>
                  ))}
                </>
              ) : (
                ""
              )}

              {e.Queries.length !== 0 ? (
                <>
                  <hr
                    color="BBBBBB"
                    style={{
                      width: "100%",
                    }}
                  />
                  <Text
                    margin={{ horizontal: "small" }}
                    size="medium"
                    style={{ width: "100%" }}
                  >
                    Suggested Search
                  </Text>
                  {e.Queries.map((e) => (
                    <Button
                      alignSelf="start"
                      plain
                      margin={{ left: "medium" }}
                      focusIndicator={false}
                      size="small"
                      href={null}
                      target={null}
                      key={e.Query}
                    >
                      <Box flex direction="row" align="center">
                        <Text
                          size="small"
                          margin={{ horizontal: "small", vertical: "xsmall" }}
                        >
                          {parse(e.Query, options)}
                        </Text>
                      </Box>
                    </Button>
                  ))}
                </>
              ) : (
                ""
              )}
            </Box>
          ) : (
            <Box
              pad={{ vertical: "small" }}
              gap="small"
              width="100%"
              height="70%"
              flex
              direction="column"
              align="start"
              overflow={{ vertical: "auto", horizontal: "hidden" }}
            >
              <Text size="medium" style={{ width: "100%" }} textAlign="center">
                No Results Found!
              </Text>
            </Box>
          )}
        </Drop>
      )
    );
  };
  return (
    <Box
      ref={boxRef}
      width="medium"
      direction="row"
      align="center"
      pad={{ horizontal: "small", vertical: "xsmall" }}
    >
      <TextInput
        placeholder="Search Hpe"
        value={value}
        onChange={handleSearchChange}
        icon={<Search color="#BBBBBB" className="search-icon" />}
        style={{background: 'white', color: '#444'}}
      />
      <Suggestions />
    </Box>
  );
};

export default QuickSearch;
