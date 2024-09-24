/* eslint-disable react/react-in-jsx-scope */
'use client'
import Image from "next/image";
import React from "react";

const imageStyle = {
  borderRadius: '50%',
}

interface PropsSocialMedia {
  tipo: number
}

interface PropsContainerProjeto {
  dados: Projeto
  descricao: string
}

interface PropsNavProjeto {
  dados: Projeto
  decricaoAberta: boolean
  setdecricaoAberta: React.Dispatch<React.SetStateAction<boolean>>
}

interface PropsSetNavegarPagina {
  page: string|boolean
  titulo: string
}

interface PropsLinksDoProjeto {
  link: string|boolean
  tipo: RedesPossiveis
}

interface PropsImageDescricao {
  decricaoAberta: boolean,
  setdecricaoAberta: React.Dispatch<React.SetStateAction<boolean>>
}

type Projeto = {
  titulo: string
  linkGit: string|boolean
  linkYT: string|boolean
  caminhoPage: string|boolean
}

enum RedesPossiveis {
  Tiktok,
  Youtube,
  Instagram,
  Github
}

function getImg(tipo : number): JSX.Element{
  if (tipo === RedesPossiveis.Tiktok) {
    return <Image
    src="/ttk.png"
    fill={true}
    alt="Logo"
    />
  }
  
  if (tipo === RedesPossiveis.Youtube) {
    return <Image
    src="/yt.png"
    fill = {true}
    alt="Logo"
    />
  }
  
  if (tipo === RedesPossiveis.Instagram) {
    return <Image
    src="/insta.png"
    fill ={true}
    alt="Logo"
    />
  }

  if (tipo === RedesPossiveis.Github) {
    return <Image
    src="/github.png"
    fill = {true}
    alt="Logo"
    />
  }

  return <p>error na imagem</p>
}

function getLink(tipo : number): string{
  if (tipo === RedesPossiveis.Tiktok) {
    return "https://www.tiktok.com/@ianestranho"
  }
  
  if (tipo === RedesPossiveis.Youtube) {
    return "https://www.youtube.com/@IanEstranho"
  }
  
  if (tipo === RedesPossiveis.Instagram) {
    return "https://www.instagram.com/ianestranho/"
  }

  return "erro"
}

function SocialMedia ({tipo}: PropsSocialMedia): JSX.Element {
  return(
      <a href={getLink(tipo)} target="_blank" rel="noopener noreferrer">
        <div className="place-content-center p-1 size-14 bg-amber-50 transition-colors duration-300 hover:bg-orange-200 rounded mx-2 shadow-lg shadow-gray-700">
          <div className="m-auto size-8 relative">
            {getImg(tipo)}
          </div>
        </div>
      </a>
  )
}

function ContainerProjeto({dados, descricao}: PropsContainerProjeto) {
  const [decricaoAberta, setdecricaoAberta] = React.useState(false)
  return(
    <div className="shadow-lg shadow-gray-700 w-72 mx-auto">
        <NavProjeto
          dados = {dados}
          decricaoAberta = {decricaoAberta}
          setdecricaoAberta = {setdecricaoAberta}
        />
        {decricaoAberta && 
          <div className="flex justify-end h-auto w-72 bg-amber-50 rounded-b p-1 mb-4 mt-0.5">
            <p className="font-medium text-left text-sm text-slate-950 mb-auto">
              {descricao}
            </p>
          </div>
        }
    </div>
  )
}

function SetNavegarPagina({page, titulo}: PropsSetNavegarPagina): JSX.Element{
  if (!page) {
    return(
      <div className="flex-none content-center p-1">
          <p className="font-medium text-left text-sm text-slate-950 my-auto">{titulo}</p>
      </div>
    )
  }
  //preciso colocar um onclick no futuro para redirecionar pro "site" do projeto(na verdade é só uma nova pagina)
  return(
    <div className="flex-none content-center transition-colors duration-300 hover:bg-orange-200 p-1">
        <p className="font-medium text-left text-sm text-slate-950 my-auto">{titulo}</p>
    </div>
  )
}

function LinksDoProjeto({link, tipo}: PropsLinksDoProjeto): JSX.Element|undefined{
  if (!link) {
    return
  }

  return(
    <div className="flex-auto h-10 w-auto px-1 transition-colors duration-300 hover:bg-orange-200">
        <a href={link as string} target="_blank" rel="noopener noreferrer">
          <div className="place-self-center h-10 w-auto max-w-10 m-auto relative">
            {getImg(tipo)}
          </div>
        </a>
      </div>
  )
}

function ImageDescricao({decricaoAberta, setdecricaoAberta}: PropsImageDescricao): JSX.Element{
  return(
    <div className="flex-auto h-10 w-auto max-w-7 content-center p-1 transition-colors duration-300 hover:bg-orange-200" onClick={() => setdecricaoAberta((prev) => !prev)}>
      {!decricaoAberta ? (
        <div className="size-6 place-self-center m-auto relative">
          <Image
          src="/seta.png"
          fill={true}
          alt="seta para baixo"
          />
        </div>
      ) : (
        <div className="size-6 place-self-center m-auto relative">
          <Image
          src="/setacima.png"
          fill = {true}
          alt="seta para cima"
          />
        </div>
      )}
    </div>
  )
}

function NavProjeto({dados, decricaoAberta, setdecricaoAberta}: PropsNavProjeto): JSX.Element {
  if (decricaoAberta) {
    return(
      <div className="flex justify-end h-10 w-72 bg-amber-50 rounded-t mt-4">
        <SetNavegarPagina
        page={dados.caminhoPage}
        titulo={dados.titulo}
        />
        <LinksDoProjeto
        link={dados.linkGit}
        tipo={RedesPossiveis.Github}
        />
        <LinksDoProjeto
        link={dados.linkYT}
        tipo={RedesPossiveis.Youtube}
        />
        <ImageDescricao
        decricaoAberta={decricaoAberta}
        setdecricaoAberta={setdecricaoAberta}
        />
      </div>
    )
  }
  return(
    <div className="flex justify-end h-10 w-72 bg-amber-50 rounded mx-auto my-4 shadow-lg shadow-gray-700">
      <SetNavegarPagina
      page={dados.caminhoPage}
      titulo={dados.titulo}
      />
      <LinksDoProjeto
      link={dados.linkGit}
      tipo={RedesPossiveis.Github}
      />
      <LinksDoProjeto
      link={dados.linkYT}
      tipo={RedesPossiveis.Youtube}
      />
      <ImageDescricao
      decricaoAberta={decricaoAberta}
      setdecricaoAberta={setdecricaoAberta}
      />
    </div>
  )
}

export default function Home() {
  return (
    <div className="place-content-center flex-initial size-full py-6">
      <div className="relative flex-initial size-64 mx-auto">
        <Image
          src="/eu.jpg"
          fill={true}
          style={imageStyle}
          alt="eu"
        />
      </div>
      <h1 className="relative text-3xl text-center py-4">Ian Projetos</h1>
      <div className="flex justify-center mx-auto content-center">
        <SocialMedia
          tipo={RedesPossiveis.Tiktok}
        />
        <SocialMedia
          tipo={RedesPossiveis.Youtube}
        />
        <SocialMedia
          tipo={RedesPossiveis.Instagram}
        />  
      </div>
      <ContainerProjeto
      dados = {{titulo: "Hub de Projetos(esse site)",
        linkGit: "https://github.com/Mintjans/Mintjans.github.io",
        linkYT: false,
        caminhoPage: false
      }}
      descricao="Um site para organizar, expor e poder navegar pelos meus projetos. Feito com React, Tailwind e Next."
      />
    </div>
  );
}
