import React, { useState, useEffect } from "react";
import * as Icons from "SVG/Icons";
import ContainedCircle from "components/shared/Buttons/ContainedCircle";
import InputFieldWithIcon from "components/shared/Buttons/InputFieldWithIcon";
import { BiSearch } from "react-icons/bi";
import { Dayjs } from "dayjs";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ToggleSwitch from "components/shared/ToggleSwitch/ToggleSwitch";
import { HiOutlineMail } from "react-icons/hi";
import { FiPhone } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import MarchandiseSnippet from "./MarchandiseSnippet";
import { AiOutlineDelete } from "react-icons/ai";


interface Props {
  NavigateBack: () => void;
}

const OffersInformation: React.FC<Props> = ({
  NavigateBack,
}: Props) => {
  // for storing date
  const [date, setDate] = React.useState<any>();

  // Toggle state to show and hide address
  const [showAddress, setShowAddress] = useState<boolean>(false);
  // state to keep data  of all inputs
  const [PickUpAddress, setPickUpAddress] = useState([{ name: "PickUpAddress1", value: "" }]);
  const [PhoneNumbers, setPhoneNumbers] = useState([{ name: "Number1", value: "" }]);
  const [Inputs, setInputs] = React.useState<any>({
    PlaceOfDeparture: "",
    PlaceOfArrival: "",
    SendingDate: "",
    IsAgency: false,
    RecieverName: "",
    RecieverEmail: "",
    PickUpAddress: [],
    PhoneNumbers: []
  });
  const InputChange = (evt: any) => {
    const value = evt.target.value;
    setInputs({
      ...Inputs,
      [evt.target.name]: value,
    });
  };
  useEffect(() => {
    setInputs({
      ...Inputs,
      PickUpAddress: PickUpAddress,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PickUpAddress]);
  useEffect(() => {
    setInputs({
      ...Inputs,
      PhoneNumbers: PhoneNumbers,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PhoneNumbers]);
  useEffect(() => {
    setInputs({
      ...Inputs,
      SendingDate: date?.format("YYYY-MM-DD"),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  console.log(Inputs);

  return (
    <div className="w-full flex flex-col justify-start items-center">
      {/* Header here */}
      <div className="w-full flex md:flex-row flex-col md:gap-0 gap-4 justify-between items-center">
        <div className="flex justify-center items-center gap-2">
          <p
            onClick={NavigateBack}
            className="font-sans text-base text-black-cool font-normal cursor-pointer"
          >
            Mes offres
          </p>
          <Icons.ArrowRight fill="none" stroke="#1A1A1A" ClassName="" />
          <p className="font-sans text-base text-black-cool font-normal">
            Publier une offre
          </p>
        </div>
        {/* =======> button */}
        <ContainedCircle Text="Publier" />
      </div>
      <div className="w-full flex flex-col lg:flex-row gap-6 justify-center items-start py-6">
        {/* =======>left Portion */}
        <div className="w-full lg:w-[65%] flex flex-col gap-8">
          {/* tops section  */}
          <div className="w-full flex flex-col justify-center items-start bg-white-main shadow-md rounded-[8px] ">
            <div className="w-full justify-start items-center border-b-[1px] border-b-white-off py-[10px] px-[20px]">
              <p className="font-NunitoSans font-[600] text-[20px] text-brand-secondary leadig-[32px]">
                Informations sur le départ
              </p>
            </div>
            <div className="p-[20px] w-full">
              <div className=" w-full flex flex-col sm:grid sm:grid-cols-[1fr_1fr_1fr] gap-2 ">
                <div className=" w-full ">
                  <InputFieldWithIcon
                    label="Lieu de départ"
                    placeholder="Selectionnez lieu"
                    isLeft={false}
                    name="PlaceOfDeparture"
                    state={Inputs.PlaceOfDeparture}
                    Set_State={InputChange}
                    icon={<BiSearch className="text-black-cool text-[26px]" />}
                  />
                </div>
                <div className=" w-full">
                  <InputFieldWithIcon
                    label="Lieu d’arrivée"
                    placeholder="Selectionnez lieu"
                    name="PlaceOfArrival"
                    state={Inputs.PlaceOfArrival}
                    Set_State={InputChange}
                    isLeft={false}
                    icon={<BiSearch className="text-black-cool text-[26px]" />}
                  />
                </div>
                <div className=" w-full flex flex-col gap-1   ">
                  <label
                    className="text-[16px] font-sans font-normla leading-[24px]"
                    htmlFor="sending-date"
                  >
                    Date d’envoi
                  </label>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      className="Calendar"
                      value={date?.format("YYYY-MM-DD")}
                      onChange={(newValue) => {
                        setDate(newValue);
                      }}
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col p-[20px] gap-2">
              <ToggleSwitch label="Dépôt en agence"
                state={Inputs.IsAgency}
                Set_State={(Checked: boolean) => {
                  setInputs({
                    ...Inputs,
                    IsAgency: Checked,
                  });
                }}
              />

              <ToggleSwitch
                label="Ramassage à domicile"
                state={showAddress}
                Set_State={setShowAddress}
              />

              {/* if switch is on then this section will be displayed else not */}
              {showAddress && (
                <>
                  <div className="w-full flex flex-col gap-3">
                    {PickUpAddress.map((item: any, index: number) => {
                      return (
                        <InputFieldWithIcon
                          key={index}
                          isLeft={false}
                          name={`PickUpAddress${index + 1}`}
                          placeholder="Exemple: Rue Mouhamed 5"
                          label={item.label}
                          Set_State={(e: any) => {
                            const value = e.target.value;
                            const name = e.target.name;
                            const newInputs = [...PickUpAddress];
                            const index = newInputs.findIndex((input) => input.name === name);
                            newInputs[index].value = value;
                            setPickUpAddress(newInputs);
                          }}
                        />
                      );
                    })}
                    <div className="flex justify-between items-center" >
                      <button
                        onClick={() => {
                          const numInputs = PickUpAddress.length + 1;
                          setPickUpAddress([...PickUpAddress, { name: `PickUpAddress${numInputs}`, value: "" }]);
                        }}
                        className="flex gap-2 items-center text-brand-main text-[14px] font-[600] font-NunitoSans leading-[24px] "
                      >
                        <AiOutlinePlus size={20} />
                        Ajouter un autre numéro de téléphone
                      </button>
                      {
                        PickUpAddress.length > 1 &&
                        <AiOutlineDelete
                          className="text-[30px] text-brand-main cursor-pointer"
                          onClick={() => {
                            const NewInputs = [...PickUpAddress];
                            NewInputs.pop();
                            setPickUpAddress(NewInputs);
                          }}
                        />
                      }
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Bottom div here */}
          <div className="w-full flex flex-col justify-center items-start bg-white-main shadow-md rounded-[8px]  ">
            <div className="w-full justify-start items-center border-b-[1px] border-b-white-off py-[10px] px-[20px]">
              <p className="font-NunitoSans font-[600] text-[20px] text-brand-secondary leadig-[32px]">
                Informations sur la destinataire
              </p>
            </div>
            <div className="p-[20px] w-full">
              <div className=" w-full flex flex-col  gap-4 ">
                <InputFieldWithIcon
                  isLeft={true}
                  placeholder="Nom et pénom de destinataire"
                  name="RecieverName"
                  Set_State={InputChange}
                  state={Inputs.RecieverName}
                  required={true}
                />
                <InputFieldWithIcon
                  isLeft={true}
                  placeholder="E-mail de destinataire"
                  type="email"
                  name="RecieverEmail"
                  icon={<HiOutlineMail size={25} />}
                  Set_State={InputChange}
                  state={Inputs.RecieverEmail}
                  required={true}
                />
                {PhoneNumbers.map((item: any, index: number) => {
                  return (
                    <InputFieldWithIcon
                      key={index}
                      isLeft={true}
                      placeholder="Numéro de téléphone"
                      name={`Number${index + 1}`}
                      type="number"
                      icon={<FiPhone size={20} />}
                      Set_State={(e: any) => {
                        const value = e.target.value;
                        const name = e.target.name;
                        const newInputs = [...PhoneNumbers];
                        const index = newInputs.findIndex((input) => input.name === name);
                        newInputs[index].value = value;
                        setPhoneNumbers(newInputs);
                      }}
                      required={true}
                    />
                  );
                })}
              </div>
              <div className="w-full flex justify-between items-center gap-2 mt-4">
                <button
                  onClick={() => {
                    const numInputs = PhoneNumbers.length + 1;
                    setPhoneNumbers([...PhoneNumbers, { name: `Number${numInputs}`, value: "" }]);
                  }}
                  className="flex gap-2 items-center text-brand-main text-[14px] font-[600] font-NunitoSans disabled:cursor-not-allowed leading-[24px] "
                >
                  <AiOutlinePlus size={20} />
                  Ajouter un autre numéro de téléphone
                </button>
                {
                  PhoneNumbers.length > 1 &&
                  <AiOutlineDelete
                    className="text-[30px] text-brand-main cursor-pointer"
                    onClick={() => {
                      const NewInputs = [...PhoneNumbers];
                      NewInputs.pop();
                      setPhoneNumbers(NewInputs);
                    }}
                  />
                }
              </div>
            </div>
            {/* this add extra phone number button will only be displayed if there is no extra phone input displayed */}

          </div>
        </div>
        {/* ========> right protion */}
        {/* =========> Mer */}
        <div className="w-full lg:w-[35%] flex flex-col bg-white-main shadow-md rounded-md">
          <MarchandiseSnippet />
        </div>
      </div>
    </div>
  );
};

export default OffersInformation;
