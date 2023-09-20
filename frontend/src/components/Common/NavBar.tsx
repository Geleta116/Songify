/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { navbarStyles } from "../../styles/NavBar/NavBarStyle"
import { logoStyles } from "../../styles/Logo/LogoStyle"

const Navbar = () => {
  return (
    <nav css={navbarStyles}>
      <div css={logoStyles}>Songify</div>
    </nav>
  )
}

export default Navbar
