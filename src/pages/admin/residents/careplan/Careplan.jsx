import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../../../context/AppContext";
import axios from "axios";

// widgets
import TopContainerWidget from "../../../../components/widgets/topContainerWidget/TopContainer";
import InfoCardShortWidget from "../../../../components/widgets/infoCardShortWidget/InfoCardShortWidget";
import CareplanActivityWidget from "../../../../components/widgets/careplanActivityWidget/CareplanActivityWidget";
import { CircleSpinner } from "../../../../components/widgets/circleSpinner/CircleSpinner.Styles";
import ButtonWidget from "../../../../components/widgets/buttonWidget/ButtonWidget";

// pages
import Add from "./add/Add";
import Edit from "./edit/Edit";

const Careplan = () => {
  const {
    activeUser,
    careplanLoading,
    setCareplanLoading,
    careplanListLoading,
    setResidentHandler,
    // residentListLoading,
    // setResidentListLoading,
    residentHandler,
  } = useContext(AppContext);

  const [resident, setResident] = useState({});

  // fetch Resident by ID
  const getResident = async () => {
    try {
      setCareplanLoading(true);
      const response = await axios.get(
        `https://wecare-api.onrender.com/api/admin/resident/one?id=${residentHandler.id}`,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      // console.log(
      //   "🚀 ~ file: Careplan.jsx ~ line 35 ~ getResident ~ response",
      //   response
      // );
      setResident(response.data.data.resident);
      setCareplanLoading(false);
    } catch (error) {
      setCareplanLoading(false);
      console.log(
        "🚀 ~ file: Careplan.jsx ~ line 39 ~ getResident ~ error",
        error
      );
    }
  };

  // Add handler
  const addHandler = async () => {
    setResidentHandler({
      ...residentHandler,
      careplan: {
        action: "add",
        activity: {},
      },
    });
  };

  // Send report handler
  const fetchReportHandler = async () => {
    try {
      setCareplanLoading(true);
      const response = await axios.get(
        `https://wecare-api.onrender.com/api/caregiver/report?residentId=${residentHandler.id}`,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      console.log(
        "🚀 ~ file: Careplan.jsx:80 ~ sendReportHandler ~ response",
        response
      );
      // setResident(response.data.data.resident);
      setCareplanLoading(false);
      setResidentHandler({
        ...residentHandler,
        careplan: {
          action: "report",
          activity: {},
        },
      });
    } catch (error) {
      setCareplanLoading(false);
      console.log(
        "🚀 ~ file: Careplan.jsx:84 ~ sendReportHandler ~ error",
        error
      );
    }
  };

  useEffect(() => {
    getResident();
  }, []);

  const Display = () => {
    if (residentHandler.careplan?.action === "add") {
      return (
        <>
          <TopContainerWidget>
            <InfoCardShortWidget
              img={resident.media && resident.media}
              r11={"Name"}
              r12={resident.name}
              r21={"Age"}
              r22={resident.age}
              r31={"Health Condition"}
              r32={resident.healthCondition}
              r41={"Address"}
              r42={resident.address}
              r51={"Next Of Kin"}
              r52={resident.nextOfKin}
              r61={"Care Giver"}
              r62={
                resident.caregiverName ? resident.caregiverName : "Unassigned"
              }
            />
            <ButtonWidget
              width={"182px"}
              height={"60px"}
              text={"Add Activity"}
              onclick={() => addHandler()}
            />
          </TopContainerWidget>
          <CareplanActivityWidget />
          <Add />
        </>
      );
    } else if (residentHandler.careplan?.action === "edit") {
      return (
        <>
          {careplanLoading ? (
            <CircleSpinner />
          ) : (
            <>
              <TopContainerWidget>
                <InfoCardShortWidget
                  img={resident.media && resident.media}
                  r11={"Name"}
                  r12={resident.name}
                  r21={"Age"}
                  r22={resident.age}
                  r31={"Health Condition"}
                  r32={resident.healthCondition}
                  r41={"Address"}
                  r42={resident.address}
                  r51={"Next Of Kin"}
                  r52={resident.nextOfKin}
                  r61={"Care Giver"}
                  r62={
                    resident.caregiverName
                      ? resident.caregiverName
                      : "Unassigned"
                  }
                />
                <ButtonWidget
                  width={"182px"}
                  height={"60px"}
                  text={"Add Activity"}
                  onclick={() => addHandler()}
                />
              </TopContainerWidget>
            </>
          )}
          <CareplanActivityWidget />
          <Edit />
        </>
      );
    } else {
      return (
        <>
          <TopContainerWidget>
            <InfoCardShortWidget
              img={resident.media && resident.media}
              r11={"Name"}
              r12={resident.name}
              r21={"Age"}
              r22={resident.age}
              r31={"Health Condition"}
              r32={resident.healthCondition}
              r41={"Address"}
              r42={resident.address}
              r51={"Next Of Kin"}
              r52={resident.nextOfKin}
              r61={"Care Giver"}
              r62={
                resident.caregiverName ? resident.caregiverName : "Unassigned"
              }
            />
            {activeUser.role === "admin" && (
              <ButtonWidget
                width={"182px"}
                height={"60px"}
                text={"Add Activity"}
                onclick={() => addHandler()}
              />
            )}
            {activeUser.role === "care-giver" && (
              <ButtonWidget
                width={"182px"}
                height={"60px"}
                text={"Fetch Report"}
                onclick={() => fetchReportHandler()}
              />
            )}
          </TopContainerWidget>
          {careplanListLoading ? <CircleSpinner /> : <CareplanActivityWidget />}
        </>
      );
    }
  };

  return <Display />;
};

export default Careplan;
