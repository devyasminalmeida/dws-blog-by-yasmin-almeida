import { useMemo, useState, useCallback } from "react";
import SearchButton from "../../atoms/SearchButton";
import SearchField from "../../atoms/SearchField";
import style from "./styles.module.scss";
import useMediaQuery from "../../../util/useMediaQuery";
import CloseIcon from "../../atoms/Icons/CloseIcon";
import ArrowLeft from "../../atoms/Icons/ArrowLeft";

export type Suggestion = {
  name: string;
  description?: string;
  image?: string;
  id: string;
};

type Props = {
  suggestions: Array<Suggestion>;
  id: string;
  placeholder?: string;
  onSelect: (suggestion: Suggestion) => void;
};

export default function AutoComplete({
  suggestions,
  id,
  placeholder = "Search",
  onSelect,
}: Props) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width: 768px)");

  const filteredSuggestions = useMemo(() => {
    if (!searchTerm) return suggestions;
    return suggestions.filter((suggestion) =>
      suggestion.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, suggestions]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchTerm(value);
      setShowSuggestions(value !== "");
    },
    []
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveSuggestionIndex((prevIndex) =>
            prevIndex === -1
              ? 0
              : prevIndex === filteredSuggestions.length - 1
              ? -1
              : prevIndex + 1
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveSuggestionIndex((prevIndex) =>
            prevIndex === -1
              ? filteredSuggestions.length - 1
              : prevIndex === 0
              ? -1
              : prevIndex - 1
          );
          break;
        case "Enter":
          e.preventDefault();
          if (activeSuggestionIndex >= 0) {
            onSelect(filteredSuggestions[activeSuggestionIndex]);
          }
          break;
        default:
          break;
      }
    },
    [filteredSuggestions, activeSuggestionIndex, onSelect]
  );

  const clearSearch = useCallback(() => {
    setSearchTerm("");
    setShowSuggestions(false);
  }, []);

  const toggleOverlay = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={style.container}>
      <label htmlFor="autocomplete-input" className="sr-only">
        Search
      </label>
      {isMobile ? (
        <>
          <SearchButton onClick={toggleOverlay} />
          <div className={`${style.overlay} ${isOpen ? style.open : ""}`}>
            <SearchField
              aria-autocomplete="list"
              aria-controls="autocomplete-list"
              aria-activedescendant={
                activeSuggestionIndex >= 0
                  ? filteredSuggestions[activeSuggestionIndex].id
                  : undefined
              }
              id={id}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              value={searchTerm}
              onChange={handleChange}
              startAdornment={
                <button className={style.closeButton} onClick={toggleOverlay}>
                  <ArrowLeft />
                </button>
              }
              endAdornment={
                <button onClick={clearSearch} className={style.closeButton}>
                  <CloseIcon />
                </button>
              }
            />
          </div>
        </>
      ) : (
        <SearchField
          aria-autocomplete="list"
          aria-controls="autocomplete-list"
          id={id}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleChange}
          endAdornment={<SearchButton />}
        />
      )}
      {showSuggestions && (
        <ul
          id="autocomplete-list"
          className={style.suggestionList}
          role="listbox"
          aria-live="polite"
        >
          {filteredSuggestions.length ? (
            filteredSuggestions.map((suggestion, index) => {
              const suggestionItemClass = `${style.suggestionItem} ${
                activeSuggestionIndex === index ? style.active : ""
              }`;

              return (
                <li
                  onClick={() => onSelect(suggestion)}
                  role="option"
                  key={suggestion.id}
                  className={suggestionItemClass}
                >
                  {suggestion.image && (
                    <img src={suggestion.image} alt={suggestion.name} />
                  )}
                  <div className={style.suggestionContent}>
                    <p className={style.suggestionName}>{suggestion.name}</p>
                    {suggestion.description && (
                      <p className={style.suggestionDescription}>
                        {suggestion.description}
                      </p>
                    )}
                  </div>
                </li>
              );
            })
          ) : (
            <li className={style.nothingFound}>Nothing found</li>
          )}
        </ul>
      )}
    </div>
  );
}
