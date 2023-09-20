export async function fetchSongsFromApi(): Promise<any> {
  try {
    const response = await fetch("http://localhost:3000/song/")
    if (!response.ok) {
      throw new Error("Failed to fetch songs")
    }
    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}
export async function postSongToApi(songData: {
  title: string
  singerName: string
  file: string
}): Promise<any> {
  try {
    const formData = new FormData()
    formData.append("name", songData.title)
    formData.append("singer", songData.singerName)
    formData.append("file", songData.file)

    const response = await fetch("http://localhost:3000/song/", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Failed to post the song")
    }

    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}
export async function patchSongToApi(songData: {
  title: string | null
  singerName: string | null
  file: string | null
  songId: number
}): Promise<any> {
  try {
    const formData = new FormData()
    if (songData.title) {
      formData.append("name", songData.title)
    }
    if (songData.singerName) {
      formData.append("singer", songData.singerName)
    }
    if (songData.file) {
      formData.append("file", songData.file)
    }

    const response = await fetch(
      `http://localhost:3000/song/${songData.songId}`,
      {
        method: "PATCH",
        body: formData,
      },
    )

    if (response.status !== 200) {
      throw new Error("Failed to patch the song")
    }

    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}

export async function deleteSongFromApi(songData: {
  songId: number
}): Promise<any> {
  try {
    const response = await fetch(
      `http://localhost:3000/song/${songData.songId}`,
      {
        method: "DELETE",
      },
    )
    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}
