/** @jsxImportSource @emotion/react */
import React, { forwardRef, useState } from "react"
import { css } from "@emotion/react"
import {
  ModalForm,
  ModalInputContainer,
  ModalInputChange,
  ErrorBorder,
} from "../../styles/Modal/ModalStyle"
import { ButtonStyles } from "../../styles/Button/ButtonStyle"
import { useDispatch } from "react-redux"
import { addSongStart } from "../../features/songs/AddSongSlice"
import { updateSongStart } from "../../features/songs/UpdateSongSlice"
import { fetchSongsStart } from "../../features/songs/FetchSongSlice"
import { CreateSongSchema } from "../../utils/validator/CreateSongModalSchema"
import { ZodError } from "zod"
import { SongInterface } from "../../utils/Interface/SongInterface"

interface ModalProps {
  id: number | null
  type: string
  onSuccess?: () => void
}

export const SongModal = forwardRef((props: ModalProps, ref) => {
  const dispatch = useDispatch()
  const songId = props.id
  const SongActionButtonColor = "#00DD00"
  const [title, setTitle] = useState("")
  const [singerName, setSingerName] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [titleError, setTitleError] = useState(false)
  const [singerNameError, setSingerNameError] = useState(false)
  const [fileError, setFileError] = useState(false)

  const onTitleChanged = (e: any) => setTitle(e.target.value)
  const onSingerNameChanged = (e: any) => setSingerName(e.target.value)
  const onFileChanged = (e: any) => setFile(e.target.files[0])

  const validateSong = (song: SongInterface) => {
    try {
      CreateSongSchema.parse({
        title: song.title,
        singerName: song.singerName,
        file: song.file,
      })
      return null
    } catch (error) {
      if (error instanceof ZodError) {
        return error.errors.map((e) => e.message)
      }
      throw error
    }
  }

  const handleclicked = async () => {
    try {
      setTitleError(false)
      setSingerNameError(false)
      setFileError(false)

      if (songId) {
        dispatch(updateSongStart({ title, singerName, file, songId }))
        await dispatch(fetchSongsStart())
      } else {
        const validationErrors = validateSong({ title, singerName, file })
        if (validationErrors) {
          if (validationErrors.includes("Title cannot be empty")) {
            setTitleError(true)
          }
          if (validationErrors.includes("Singer name cannot be empty")) {
            setSingerNameError(true)
          }
          if (validationErrors.includes("Input not instance of File")) {
            setFileError(true)
          }
          return
        }

        dispatch(addSongStart({ title, singerName, file }))
        await dispatch(fetchSongsStart())
      }

      props.onSuccess && props.onSuccess() 
    } catch (err) {
      throw new Error(err)
    }
  }

  return (
    <div css={ModalForm}>
      <h2
        css={css`
          font-size: 24px;
          margin-bottom: 20px;
        `}
      >
        {props.type} Song
      </h2>
      <form
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          gap: 20px;
        `}
      >
        <div>
          <div css={[ModalInputContainer]}>
            <label
              htmlFor="SongTitle"
              css={css`
                font-weight: bold;
              `}
            >
              Song Title:
            </label>
            <input
              type="text"
              id="SongTitle"
              name="SongTitle"
              value={title}
              onChange={onTitleChanged}
              css={[ModalInputChange, titleError && ErrorBorder]}
            />
          </div>
          {titleError && (
            <p
              css={css`
                color: #f00;
              `}
            >
              Song Title cannot be empty
            </p>
          )}
        </div>
        <div css={[ModalInputContainer]}>
          <label
            htmlFor="Singer"
            css={css`
              font-weight: bold;
            `}
          >
            Singer:
          </label>
          <input
            type="text"
            id="Singer"
            name="Singer"
            value={singerName}
            onChange={onSingerNameChanged}
            css={[ModalInputChange, singerNameError && ErrorBorder]}
          />
          {singerNameError && (
            <p
              css={css`
                color: #f00;
              `}
            >
              Singer Name cannot be empty
            </p>
          )}
        </div>
        <div css={[ModalInputContainer]}>
          <label
            htmlFor="SongFile"
            css={css`
              font-weight: bold;
            `}
          >
            Upload Song File:
          </label>
          <input
            type="file"
            id="SongFile"
            name="SongFile"
            accept=".mp3, .wav"
            onChange={onFileChanged}
            css={fileError && ErrorBorder}
          />
          {fileError && (
            <p
              css={css`
                color: #f00;
              `}
            >
              Please insert a valid audio file
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={handleclicked}
          css={ButtonStyles(SongActionButtonColor)}
        >
          Save Song
        </button>
      </form>
    </div>
  )
})
