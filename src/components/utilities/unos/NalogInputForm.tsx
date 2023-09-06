import React, { useEffect, useState } from "react";
import { Grid, Typography, Button } from "@mui/material";
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
import { setGrupaNaloga } from "../../../redux/grupaSlice";

interface NalogInputProps {
  Item: any;
}

interface FormValues {
  iznos: number;
  imePlat: string;
  adresaPlat: string;
  mjestoPlat: string;
  imePrim: string;
  adresaPrim: string;
  mjestoPrim: string;
  sifOpisPlac: string;
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

interface GrupaNaloga {
  id: number;
  id_user: number;
  sts_grupe: string;
  date: string;
}

export const NalogInputForm: React.FC<NalogInputProps> = ({ Item }) => {
  const [isCheckedUplata, setCheckedUplata] = useState(true);
  const [isCheckedIsplata, setCheckedIsplata] = useState(false);

  const [isUplata, setUplata] = useState(true);
  const [isIsplata, setIsplata] = useState(false);

  const dispatch = useDispatch();

  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const currentGrupa = useSelector(
    (state: RootState) => state.grupaNaloga.currentGrupaNaloga
  );
  const currentUnosNaloga = useSelector(
    (state: RootState) => state.unosNaloga.currentUnosNaloga
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
    } else if (name === "checkboxIsplata") {
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

  const formik = useFormik<FormValues>({
    initialValues: {
      iznos: 0,
      imePlat: "",
      adresaPlat: "",
      mjestoPlat: "",
      imePrim: "",
      adresaPrim: "",
      mjestoPrim: "",
      sifOpisPlac: "",
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
          console.log("Nalog saved successfully!");
          const grupaNalogaData: GrupaNaloga = {
            ...response.data,
            date: new Date(response.data.date).toISOString().split("T")[0],
          };
          dispatch(setGrupaNaloga(grupaNalogaData));

          resetFormToInitialValues();
        } else {
          console.error("Error saving nalog:", response.data);
        }
      } catch (error) {
        console.error("Error saving nalog:", error);
      }
    },
  });

  useEffect(() => {
    handleCheckboxChange({ target: { name: "checkboxUplata" } });
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
                <KonsigTable />
              </Grid>
            </Item>
          </Grid>
        </Grid>

        <Grid container justifyContent="right">
          <Grid item xs={12} md={8} lg={3} justifyContent="center">
            <Item>
              <Grid container justifyContent="space-evenly" spacing={2}>
                <Grid item>
                  <Button
                    style={{ backgroundColor: "#e99516" }}
                    variant="contained"
                  >
                    Pokušaj ponovno
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" type="submit">
                    Spremi nalog
                  </Button>
                </Grid>
              </Grid>
            </Item>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};
