/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

export const ButtonStyles = (backgroundColor: string) => css`
  background-color: ${backgroundColor};
  text-align: center;
  font-size: 16px;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff814d;
  }
`
