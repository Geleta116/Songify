/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchSongsStart } from "../../features/songs/FetchSongSlice"
import Navbar from "../../components/Common/NavBar"
import { Modal } from "@mui/material"
import {
  tableStyles,
  thStyles,
  tdStyles,
  tableContainerStyles,
} from "../../styles/Table/TableStyle"
import { ButtonStyles } from "../../styles/Button/ButtonStyle"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome" 
import { faAdd, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons" 
import { SongModal } from "../../components/Modals/SongModal"
import { deleteSongStart } from "../../features/songs/DeleteSongSlice"

interface Song {
  id: React.Key | null | undefined
  name: string | undefined
  singer: string | undefined
  url: string | undefined
}

export const SongsList = () => {
  const songsData = useSelector((state: any) => state.songs)
  const addSong = useSelector((state: any) => state.addSongs)
  const updateSong = useSelector((state: any) => state.updateSongs)
  const [openCreate, setOpenCreate] = useState(false)
  const [CurrId, setCurrId] = useState(0)
  const [openUpdate, setOpenUpdate] = useState(false)
  const dispatch = useDispatch()
  const DeleteButtonColor = "#FF0000"
  const UpdateButtonColor = "#00DD00"
  const CreateButtonColor = "#00DD00"

  useEffect(() => {
    dispatch(fetchSongsStart())
  }, [dispatch])

  function DeleteSongHandler(songId: number) {
    dispatch(deleteSongStart({ songId }))
  }

  function toggleCreateModal(): void {
    setOpenCreate(!openCreate)
  }

  function toggleUpdateModal(id: number | null | undefined) {
    setOpenUpdate(!openUpdate)
    setCurrId(id || 0)
  }

  const handleCloseModal = () => {
    setOpenCreate(false)
    setOpenUpdate(false)
  }

  return (
    <>
      <Navbar />
      <div css={tableContainerStyles}>
        <table css={tableStyles}>
          <thead>
            <tr>
              <th css={thStyles}>Name</th>
              <th css={thStyles}>Singer</th>
              <th css={thStyles}>Audio</th>
              <th css={thStyles}></th>
              <th css={thStyles}>
                <button
                  css={ButtonStyles(CreateButtonColor)}
                  onClick={toggleCreateModal}
                >
                  <FontAwesomeIcon icon={faAdd} />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {songsData.data.map((song: Song) => (
              <tr key={song.id}>
                <td css={tdStyles}>{song.name}</td>
                <td css={tdStyles}>{song.singer}</td>
                <td css={tdStyles}>
                  <audio src={song.url} controls />
                </td>

                <td css={tdStyles}>
                  <button
                    css={ButtonStyles(UpdateButtonColor)}
                    onClick={() => toggleUpdateModal(Number(song.id))}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </td>
                <td css={tdStyles}>
                  <button
                    css={ButtonStyles(DeleteButtonColor)}
                    onClick={() => DeleteSongHandler(Number(song.id))}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal open={openCreate} onClose={handleCloseModal}>
        <SongModal type="Create a new" onSuccess={handleCloseModal} id={null} />
      </Modal>
      <Modal open={openUpdate} onClose={handleCloseModal}>
        <SongModal
          type="Update this"
          id={CurrId}
          onSuccess={handleCloseModal}
        />
      </Modal>
    </>
  )
}
