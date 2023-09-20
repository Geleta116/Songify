// TableStyles.js
import { css } from "@emotion/react"

export const tableContainerStyles = css`
  max-width: 1400px; /* Adjust the max width as needed */
  margin: 0 auto; /* Center the container horizontally */
`

export const tableStyles = css`
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`

export const thStyles = css`
  background-color: #333;
  color: #fff;
  font-weight: bold;
  padding: 12px;
  text-align: center;
`

export const tdStyles = css`
  padding: 12px;
  border-bottom: 1px solid #ddd;
  text-align: center;
  &:last-child {
    border-bottom: none;
  }
`
