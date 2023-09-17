import React, { useEffect, useState } from "react";
import { Grid, Typography, Button, Snackbar, Alert } from "@mui/material";
import { KonsigTable } from "../konsignacija/KonsigTable";
import { useFormik } from "formik";
import * as yup from "yup";
import { FirstSection } from "./FirstSection";
import { SecondSection } from "./SecondSection";
import { ThirdSection } from "./ThirdSection";
import { kontrolniBrojRegex } from "../regex/Validation";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../../../redux/store";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setGrupaNaloga } from "../../../redux/slice";
import { v4 as uuidv4 } from "uuid";
import { addUnosNaloga } from "../../../redux/slice";

interface NalogInputProps {
  Item: any;
}

interface FormValues {
  id: string;
  iznos: number;
  imePlat: string;
  adresaPlat: string;
  mjestoPlat: string;
  imePrim: string;
  adresaPrim: string;
  mjestoPrim: string;
  sifOpisPlac: number;
  sifNamjene: string;
  datIzvrsenja: string | null;
  datPodnosenja: string | null;
  drzavaRac: string;
  kontrolniBrojPlat: string;
  pnbPlat: string;
  ibanPlat: string;
  modelPlat: string;
  pnbPrim: string;
  kontrolniBrojPrim: string;
  ibanPrim: string;
  modelPrim: string;
  opisPlac: string;
  brBlagajne: number | undefined;
  vrNaknade: number;
  iznosNaknade: number;
}

interface UnosNalogaForInputForm {
  id: string;
  brRac: string;
  iznUpl: number;
  iznIspl: number;
  date: string;
  pnb: string;
  naknada: number;
  sifOpisPlac: number;
  sifNamjene: string;
  status: string;
}

export const NalogInputForm: React.FC<NalogInputProps> = ({ Item }) => {
  const [isCheckedUplata, setCheckedUplata] = useState(true);
  const [isCheckedIsplata, setCheckedIsplata] = useState(false);

  const [isUplata, setUplata] = useState(false);
  const [isIsplata, setIsplata] = useState(false);

  const [isDatoteka, setDatoteka] = useState(false);

  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [errorAlertOpenGrupaNaloga, setErrorAlertOpenGrupaNaloga] =
    useState(false);

  const handleSuccessAlertClose = () => {
    setSuccessAlertOpen(false);
    setErrorAlertOpenGrupaNaloga(false);
  };

  const dispatch = useDispatch();

  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const currentGrupa = useSelector(
    (state: RootState) => state.grupaNaloga.currentGrupaNaloga
  );
  const currentNalogList = useSelector(
    (state: RootState) => state.unosNaloga.unosNalogaList
  );

  const resetFormToInitialValues = () => {
    formik.resetForm();
  };

  const handleCheckboxChange = async (event: any) => {
    const { name } = event.target;

    resetFormToInitialValues();

    if (name === "checkboxUplata") {
      setCheckedUplata(true);
      setCheckedIsplata(false);
      setUplata(true);
      setIsplata(false);
      localStorage.setItem("tipGrupeNaloga", "checkboxUplata");
    } else if (name === "checkboxIsplata") {
      setCheckedUplata(false);
      setCheckedIsplata(true);
      setUplata(false);
      setIsplata(true);
      localStorage.setItem("tipGrupeNaloga", "checkboxIsplata");
    }

    const storedTipGrupeNaloga = localStorage.getItem("tipGrupeNaloga");

    if (storedTipGrupeNaloga === "checkboxUplata") {
      formik.setFieldValue("ibanPrim", "24020061100525045");
      formik.setFieldValue("kontrolniBrojPrim", "23");
      formik.setFieldValue("modelPrim", "99");

      const drzavaRac = formik.values.drzavaRac;
      const kontrolniBrojRac = "23";
      const ibanRac = "24020061100525045";

      try {
        const response = await axios.post(
          "http://localhost:8080/api/getRacunInfo",
          {
            drzavaRac,
            kontrolniBrojRac,
            ibanRac,
          }
        );

        if (response.data && response.data !== "") {
          const ime = response.data.ime;
          const adresa = response.data.adresa;
          const mjesto = response.data.mjesto;

          formik.setFieldValue("imePrim", ime);
          formik.setFieldValue("adresaPrim", adresa);
          formik.setFieldValue("mjestoPrim", mjesto);
        }
      } catch (error) {
        console.error("Error fetching iban_prim:", error);
      }
    } else if (storedTipGrupeNaloga === "checkboxIsplata") {
      formik.setFieldValue("ibanPlat", "24020061100525045");
      formik.setFieldValue("kontrolniBrojPlat", "23");
      formik.setFieldValue("modelPlat", "99");

      const drzavaRac = formik.values.drzavaRac;
      const kontrolniBrojRac = "23";
      const ibanRac = "24020061100525045";

      try {
        const response = await axios.post(
          "http://localhost:8080/api/getRacunInfo",
          {
            drzavaRac,
            kontrolniBrojRac,
            ibanRac,
          }
        );

        if (response.data && response.data !== "") {
          const ime = response.data.ime;
          const adresa = response.data.adresa;
          const mjesto = response.data.mjesto;

          formik.setFieldValue("imePlat", ime);
          formik.setFieldValue("adresaPlat", adresa);
          formik.setFieldValue("mjestoPlat", mjesto);
        }
      } catch (error) {
        console.error("Error fetching iban_prim:", error);
      }
    }
  };

  const validationSchema = yup.object({
    iznos: yup
      .string()
      .matches(
        /^[0-9]*(\.[0-9]{1,2})?$/,
        "Iznos mora biti broj sa 2 decimalna mjesta"
      )
      .test(
        "is-greater-than-0.1",
        "Iznos mora biti veći ili jednak 0.1",
        (value) => {
          const valueAsString = (value ?? "0").toString();
          return (
            /^[0-9]*(\.[0-9]{1,2})?$/.test(valueAsString) &&
            parseFloat(valueAsString) >= 0.1
          );
        }
      )
      .required("Iznos je obavezan"),
    imePlat: yup.string().required("Ime platitelja je obavezno"),
    adresaPlat: yup.string().required("Adresa platitelja je obavezna"),
    mjestoPlat: yup.string().required("Mjesto platitelja je obavezno"),
    imePrim: yup.string().required("Ime primatelja je obavezno"),
    adresaPrim: yup.string().required("Adresa primatelja je obavezna"),
    mjestoPrim: yup.string().required("Mjesto primatelja je obavezno"),
    sifOpisPlac: yup.string().required("Šifra opisa plaćanja je obavezna"),
    sifNamjene: yup.string(),
    datIzvrsenja: yup.date().nullable(),
    datPodnosenja: yup.date().nullable(),
    drzavaPlat: yup.string(),
    kontrolniBrojPlat: yup
      .string()
      .required("Kontrolni broj platitelja je obavezan")
      .matches(kontrolniBrojRegex, "Neispravan format"),
    pnbPlat: yup.string(),
    ibanPlat: yup
      .string()
      .required("IBAN platitelja je obavezan")
      .matches(
        /^[0-9]{17}$/,
        "IBAN platitelja mora sadržavati točno 17 brojeva"
      ),

    modelPlat: yup.string().required("Model platitelja je obavezan"),
    pnbPrim: yup.string(),
    drzavaPrim: yup.string(),
    kontrolniBrojPrim: yup
      .string()
      .required("Kontrolni broj primatelja je obavezan"),
    ibanPrim: yup
      .string()
      .required("IBAN primatelja je obavezan")
      .matches(
        /^[0-9]{17}$/,
        "IBAN primatelja mora sadržavati točno 17 brojeva"
      ),

    modelPrim: yup.string().required("Model prrimatelja je obavezan"),
    opisPlac: yup.string().required("Opis plaćanja je obavezan"),
    brBlagajne: yup.number(),
    vrNaknade: yup.number(),
    iznosNaknade: yup.number(),
  });

  const currentDate = new Date();
  const formattedCurrentDate = currentDate.toISOString().split("T")[0];

  const mapFormValuesToUnosNaloga = (
    formValues: FormValues,
    statusGrupe: string
  ): UnosNalogaForInputForm => {
    return {
      id: uuidv4(),
      brRac:
        isUplata === true
          ? formValues.drzavaRac +
            formValues.kontrolniBrojPrim +
            formValues.ibanPrim
          : formValues.drzavaRac +
            formValues.kontrolniBrojPlat +
            formValues.ibanPlat,
      iznUpl: isUplata === true ? formValues.iznos : 0,
      iznIspl: isUplata === false ? formValues.iznos : 0,
      date: formValues.datIzvrsenja || "",
      pnb: isUplata === true ? formValues.pnbPlat : formValues.pnbPrim,
      naknada: formValues.iznosNaknade,
      sifOpisPlac: formValues.sifOpisPlac,
      sifNamjene: formValues.sifNamjene,
      status: statusGrupe,
    };
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      id: uuidv4(),
      iznos: 0,
      imePlat: "",
      adresaPlat: "",
      mjestoPlat: "",
      imePrim: "",
      adresaPrim: "",
      mjestoPrim: "",
      sifOpisPlac: 0,
      sifNamjene: "",
      datIzvrsenja: formattedCurrentDate,
      datPodnosenja: formattedCurrentDate,
      drzavaRac: "HR",
      kontrolniBrojPlat: "",
      pnbPlat: "",
      ibanPlat: "",
      modelPlat: "",
      pnbPrim: "",
      kontrolniBrojPrim: "",
      ibanPrim: "",
      modelPrim: "",
      opisPlac: "",
      brBlagajne: currentUser?.brBlagajne,
      vrNaknade: 0,
      iznosNaknade: 0,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const userId = currentUser?.id;
        const nalogDto = values;
        const uplata = isUplata;
        const isplata = isIsplata;
        const grupaNaloga = currentGrupa;

        if (grupaNaloga?.sts_grupe === "Izvršen") {
          setErrorAlertOpenGrupaNaloga(true);
          return;
        }

        const response = await axios.post(
          "http://localhost:8080/api/insertNalog",
          {
            nalogDto,
            userId,
            uplata,
            isplata,
            grupaNaloga,
          }
        );

        if (response.data && response.data !== "") {
          dispatch(setGrupaNaloga(response.data));

          const nalogDtoMap = mapFormValuesToUnosNaloga(
            values,
            response.data.sts_grupe
          );

          dispatch(addUnosNaloga(nalogDtoMap));

          setSuccessAlertOpen(true);

          const storedTipGrupeNaloga = localStorage.getItem("tipGrupeNaloga");

          resetFormToInitialValues();
          if (storedTipGrupeNaloga === "checkboxUplata") {
            setCheckedUplata(true);
            setCheckedIsplata(false);
            setUplata(true);
            setIsplata(false);

            formik.setFieldValue("ibanPrim", "24020061100525045");
            formik.setFieldValue("kontrolniBrojPrim", "23");
            formik.setFieldValue("modelPrim", "99");

            const drzavaRac = formik.values.drzavaRac;
            const kontrolniBrojRac = "23";
            const ibanRac = "24020061100525045";

            try {
              const response = await axios.post(
                "http://localhost:8080/api/getRacunInfo",
                {
                  drzavaRac,
                  kontrolniBrojRac,
                  ibanRac,
                }
              );

              if (response.data && response.data !== "") {
                const ime = response.data.ime;
                const adresa = response.data.adresa;
                const mjesto = response.data.mjesto;

                formik.setFieldValue("imePrim", ime);
                formik.setFieldValue("adresaPrim", adresa);
                formik.setFieldValue("mjestoPrim", mjesto);
              }
            } catch (error) {
              console.error("Error fetching iban_prim:", error);
            }
          } else if (storedTipGrupeNaloga === "checkboxIsplata") {
            setCheckedIsplata(true);
            setCheckedUplata(false);
            setUplata(false);
            setIsplata(true);

            formik.setFieldValue("ibanPlat", "24020061100525045");
            formik.setFieldValue("kontrolniBrojPlat", "23");
            formik.setFieldValue("modelPlat", "99");

            const drzavaRac = formik.values.drzavaRac;
            const kontrolniBrojRac = "23";
            const ibanRac = "24020061100525045";

            try {
              const response = await axios.post(
                "http://localhost:8080/api/getRacunInfo",
                {
                  drzavaRac,
                  kontrolniBrojRac,
                  ibanRac,
                }
              );

              if (response.data && response.data !== "") {
                const ime = response.data.ime;
                const adresa = response.data.adresa;
                const mjesto = response.data.mjesto;

                formik.setFieldValue("imePlat", ime);
                formik.setFieldValue("adresaPlat", adresa);
                formik.setFieldValue("mjestoPlat", mjesto);
              }
            } catch (error) {
              console.error("Error fetching iban_prim:", error);
            }
          }
        } else {
          console.error("Error saving nalog:", response.data);
        }
      } catch (error) {
        console.error("Error saving nalog:", error);
      }
    },
  });

  useEffect(() => {
    const storedTipGrupeNaloga = localStorage.getItem("tipGrupeNaloga");
    let tipGrupeNaloga = "";

    if (storedTipGrupeNaloga === "Datoteka") {
      setDatoteka(true);
    } else if (
      storedTipGrupeNaloga === null ||
      storedTipGrupeNaloga === "" ||
      storedTipGrupeNaloga === "Datoteka"
    ) {
      tipGrupeNaloga = "checkboxUplata";
    } else {
      tipGrupeNaloga = storedTipGrupeNaloga;
    }

    handleCheckboxChange({ target: { name: tipGrupeNaloga } });
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container justifyContent="center">
        <FirstSection
          Item={Item}
          handleCheckboxChange={handleCheckboxChange}
          isCheckedIsplata={isCheckedIsplata}
          isCheckedUplata={isCheckedUplata}
          formik={formik}
        />

        <SecondSection
          Item={Item}
          isUplata={isUplata}
          isIsplata={isIsplata}
          formik={formik}
        />

        <ThirdSection
          Item={Item}
          isUplata={isUplata}
          isIsplata={isIsplata}
          formik={formik}
        />

        <Grid container justifyContent="center">
          <Grid item xs={10} md={10} lg={10}>
            <Item>
              <Grid item justifyContent="center">
                <Typography
                  style={{ marginBottom: 15, fontWeight: "bold" }}
                  variant="h5"
                >
                  Konsignacija
                </Typography>
              </Grid>
              <Grid item justifyContent="center">
                <KonsigTable nalogList={currentNalogList} />
              </Grid>
            </Item>
          </Grid>
        </Grid>

        <Grid container justifyContent="right">
          <Grid item xs={12} md={8} lg={2} justifyContent="center">
            <Item>
              <Grid container justifyContent="space-evenly" spacing={2}>
                <Grid item>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={isDatoteka}
                  >
                    Spremi nalog
                  </Button>
                </Grid>
              </Grid>
              <Snackbar
                open={successAlertOpen}
                autoHideDuration={5000}
                onClose={handleSuccessAlertClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              >
                <Alert
                  onClose={handleSuccessAlertClose}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  Uspješno spremljen nalog
                </Alert>
              </Snackbar>
              <Snackbar
                open={errorAlertOpenGrupaNaloga}
                autoHideDuration={5000}
                onClose={handleSuccessAlertClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              >
                <Alert
                  onClose={handleSuccessAlertClose}
                  severity="error"
                  sx={{ width: "100%" }}
                >
                  Grupa naloga je izvršena, zatvori konsignaciju
                </Alert>
              </Snackbar>
            </Item>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};
