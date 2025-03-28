// @ts-nocheck

import React, { useContext, useState } from "react";
import { Button, TextField, Autocomplete, List, ListItem, ListItemText, IconButton } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import AvailableSchedulesContext from "../context/availableSchedulesContext2";
import { api } from "../services/api";
import Select from "react-select";
import { Container, FormButtons, FormColumn, ScalesTable, SectionTitle, TwoColumnLayout } from "../../styles/pages/parameters";
import { ToastContainer, toast, Slide } from "react-toastify";

const Parameters = () => {
  const { optionsEscalas, setOptionsEscalas } = useContext(AvailableSchedulesContext);
  const [novoTipoEscala, setNovoTipoEscala] = useState("");
  const [novoLocal, setNovoLocal] = useState("");
  const [novasAssociacoes, setNovasAssociacoes] = useState([]);
  const [salvo, setSalvo] = useState(false);

  const handleAdicionar = () => {
    const tipoEscalaValido = novoTipoEscala?.trim();
    const localValido = novoLocal?.trim();

    if (tipoEscalaValido && !salvo) {
      const novaAssociacao = { tipoEscala: tipoEscalaValido, local: localValido };

      if (!novasAssociacoes.some((a) => a.tipoEscala === tipoEscalaValido && a.local === localValido)) {
        setNovasAssociacoes((prev) => [...prev, novaAssociacao]);

        setOptionsEscalas((prevMap) => {
          const newMap = new Map(prevMap);
          if (!newMap.has(tipoEscalaValido)) {
            newMap.set(tipoEscalaValido, []);
          }
          newMap.get(tipoEscalaValido).push(localValido);
          return newMap;
        });

        setNovoTipoEscala("");
        setNovoLocal("");
      }
    }
  };

  const handleRemover = (index) => {
    const novaLista = [...novasAssociacoes];
    const { tipoEscala, local } = novaLista[index];

    novaLista.splice(index, 1);
    setNovasAssociacoes(novaLista);

    setOptionsEscalas((prevMap) => {
      const newMap = new Map(prevMap);
      const locaisAtualizados = newMap.get(tipoEscala)?.filter((l) => l !== local) || [];
      if (locaisAtualizados.length > 0) {
        newMap.set(tipoEscala, locaisAtualizados);
      } else {
        newMap.delete(tipoEscala);
      }
      return newMap;
    });
  };

  const handleSalvar = async () => {
    try {
      await api.post("/tipo-escala-locais", novasAssociacoes);
      setNovasAssociacoes([]);
      toast.success("Alterações salvas com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar novas associações:", error);
      toast.error("Erro ao salvar associações.");
    }
  };

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      minHeight: "30px",
      height: "32px",
      fontSize: "13px",
      minWidth: "200px",
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      height: "30px",
      padding: "0 6px",
    }),
    input: (provided: any) => ({
      ...provided,
      margin: "0px",
    }),
    indicatorSeparator: (provided: any) => ({
      display: "none",
    }),
    indicatorsContainer: (provided: any) => ({
      ...provided,
      height: "30px",
    }),
    option: (provided: any) => ({
      ...provided,
      fontSize: "13px",
      padding: "8px 10px",
    }),
  };

  return (
    <Container>
      <ToastContainer autoClose={2500} transition={Slide} />
      <SectionTitle>
        <h1>Gerenciamento de Escalas e Locais</h1>
        <p style={{ color: "#c50b0b" }}>
          Atenção: Você pode apenas adicionar novos itens. A remoção só é permitida antes de salvar. Certifique-se de clicar em 'Salvar'
          para finalizar as alterações.
        </p>
      </SectionTitle>

      <TwoColumnLayout>
        <ScalesTable>
          <thead>
            <tr>
              <th>Tipo de Escala</th>
              <th>Locais</th>
            </tr>
          </thead>
          <tbody>
            {[...optionsEscalas.entries()].map(([tipoEscala, locais]) => {
              const locaisFiltrados = locais.filter((local) => local?.trim());

              return (
                <tr key={tipoEscala}>
                  <td>{tipoEscala}</td>
                  <td>
                    {locaisFiltrados.length > 0 && (
                      <Select
                        options={locaisFiltrados.map((local) => ({ value: local, label: local }))}
                        value={null}
                        onChange={(selectedOption) => {
                          console.log("Local selecionado:", selectedOption?.value);
                        }}
                        isClearable
                        isSearchable
                        placeholder='Visualizar os Locais'
                        styles={customStyles}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </ScalesTable>

        <FormColumn>
          <div style={{ backgroundColor: "white" }}>
            <Autocomplete
              style={{ display: "flex" }}
              options={[...optionsEscalas.keys()]}
              value={novoTipoEscala || ""}
              onChange={(_, newValue) => setNovoTipoEscala(newValue || "")}
              onInputChange={(_, newValue) => setNovoTipoEscala(newValue)}
              freeSolo
              size='small'
              renderInput={(params) => <TextField {...params} label='Novo Tipo de Escala' disabled={salvo} />}
            />
          </div>

          <div style={{ backgroundColor: "white" }}>
            <TextField
              style={{ display: "flex" }}
              size='small'
              label='Novo Local'
              value={novoLocal}
              onChange={(e) => setNovoLocal(e.target.value)}
              disabled={salvo}
            />
          </div>

          <FormButtons>
            <Button onClick={handleAdicionar} variant='contained'>
              Adicionar
            </Button>
            <Button onClick={handleSalvar} variant='contained'>
              Salvar
            </Button>
          </FormButtons>

          <List>
            {novasAssociacoes.map((associacao, index) => (
              <ListItem key={index} style={{ backgroundColor: "#dbdbdb", marginBottom: 5 }} dense>
                <ListItemText primary={`${associacao.tipoEscala} - ${associacao.local}`} />
                {!salvo && (
                  <IconButton edge='end' onClick={() => handleRemover(index)}>
                    <DeleteIcon />
                  </IconButton>
                )}
              </ListItem>
            ))}
          </List>
        </FormColumn>
      </TwoColumnLayout>
    </Container>
  );
};

export default Parameters;
