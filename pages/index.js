import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import React from "react";

function HomePage() {
  // const estilosDaHomePage = {
  //   backgroundColor: "red"
  // };
  const [valorFiltro, setValorFiltro] = React.useState("");

  return (
    <>
      <CSSReset />
      <div style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        overflowX: "hidden",
      }}>
        <Menu valorFiltro={valorFiltro} setValorFiltro={setValorFiltro} />
        <Header></Header>
        <Timeline searchValue={valorFiltro} playlists={config.playlists}>
          Conteúdo
        </Timeline>
      </div>
    </>
  )
}

export default HomePage

// function Menu() {
//   return (
//     <div>
//       Menu aqui
//     </div>
//   )
// }

const StyledHeader = styled.div`

  .img-user {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }

  .user-info {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 1rem 2rem;
    gap: .5rem;
  }
`;

const StyledBanner = styled.div`
  background-color: blue;
  background-image:url(${({bgImage}) => bgImage});
  height: 230px;
`;

function Header() {
  return (
    <StyledHeader>
      <StyledBanner bgImage={config.bgImage} />
      <section className="user-info">
        <img className="img-user" src={`https://github.com/${config.github}.png`} />
        <div>
          <h2>
            {config.name}
          </h2>
          <p>
            {config.job}
          </p>
        </div>
      </section>
    </StyledHeader>
  )
}

function Timeline({searchValue, ...propriedades}) {
  const playlistName = Object.keys(propriedades.playlists);
  return (
    <StyledTimeline>
      {playlistName.map((playlistName) => {
        const videos = propriedades.playlists[playlistName];
        return (
          <section key={playlistName}>
            <h2>{playlistName}</h2>
            <div>
              {
                videos.filter((video) => {
                  const titleNormalized = video.title.toLowerCase();
                  const searchValueNormalized = searchValue.toLowerCase();
                  return titleNormalized.includes(searchValueNormalized);
                }).map((video) => {
                  return (
                    <a key={video.url} href={video.url}>
                      <img src={video.thumb}/>
                      <span>
                        {video.title}
                      </span>
                    </a>
                  )
                })
              }
            </div>
          </section>
        )
      })}
    </StyledTimeline>
  )
}