import { parse } from 'query-string';

const parseConfig = {
  skipNull: true,
  skipEmptyString: true,
  parseNumbers: false,
  parseBooleans: false,
};

const useQueryString = (str: string = window.location.search) => parse(str, parseConfig);

export default useQueryString;
