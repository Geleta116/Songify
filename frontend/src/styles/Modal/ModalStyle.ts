/** @jsxImportSource @emotion/react */
import React, { useState } from "react"
import { css } from "@emotion/react"

export const ModalForm = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 999;
  width: 80%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`

export const ModalInputContainer = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const ModalInputChange = css`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`
export const ErrorBorder = css`
  border: 1px solid red;
`
