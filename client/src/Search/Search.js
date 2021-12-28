import React from "react";
import styles from './search.module.scss';


const Search = ({onChange, onSearch, onClick, autoComplete, value, loaded}) => {

    return (
      <>
        <div className={styles.formWrapper}>
          <div className={styles.formLogo}>
            <img src="./logo.png" alt="formLogo" className={!loaded ? styles.Loading : 'f'}/>
          </div>
          <form onSubmit={onSearch} className={styles.form}>
            <input
              type="text"
              onChange={onChange}
              value={value}
              className={styles.text}
            />
            <input type="submit" className={styles.submit} value="S" />
          </form>
          <div className={styles.autoCompleteList}>
            {autoComplete.slice(0, 8).map((div) => (
              <div
                className={styles.autoCompleteItem}
                key={div.code}
                onClick={() => onClick(div.country)}
              >
                {div.country}
              </div>
            ))}
          </div>
        </div>
      </>
    );
}
export default Search;