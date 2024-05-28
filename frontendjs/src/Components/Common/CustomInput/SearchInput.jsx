import CustomInput from './CustomInput'

/**
 * @typedef {object} Props
 * @prop {(e: import('react').KeyboardEvent<HTMLInputElement>) => void} [onEnter]
 */
/**
 *
 * @param {import("react").InputHTMLAttributes & Props} props
 * @returns
 */
const SearchInput = ({ onEnter, onKeyDown, ...rest }) => {
  const onKeyDownCustom = (e) => {
    onKeyDown && onKeyDown(e)
    if (e.keyCode === 13) {
      onEnter && onEnter(e)
    }
  }

  return (
    <div className="d-flex justify-content-sm-end w-100">
      <div className="search-box w-100">
        <CustomInput onKeyDown={onKeyDownCustom} {...rest} />
        <i className="ri-search-line search-icon"></i>
      </div>
    </div>
  )
}

export default SearchInput
