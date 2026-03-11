import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonTitle,
  IonToolbar
} from '@ionic/react';

import {
  arrowBack,
  personCircle,
  swapVerticalOutline,
  textOutline
} from 'ionicons/icons';

import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { supabase } from '../../../supabaseClient';

import './DR_PatientList.css';

const PatientList: React.FC = () => {

  const history = useHistory();

  const [patients, setPatients] = useState<any[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [sortType, setSortType] = useState("az");

  const goDetail = (id: string) => {
    history.push(/doctor/patient-detail/${id});
  };

  const goDashboard = () => {
    history.push("/dashboard");
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {

    const { data, error } = await supabase
      .from('profiles')
      .select('*');

    if (error) {
      console.log(error);
      return;
    }

    const formatted = data.map((p: any) => ({
      _id: p.id,
      name: ${p.first_name} ${p.last_name},
      phone: p.phone,
      image: null
    }));

    setPatients(formatted);
    setFilteredPatients(formatted);
  };

  const handleSearch = (text: string) => {

    setSearchText(text);

    let result = patients.filter(p =>
      p.name.toLowerCase().includes(text.toLowerCase())
    );

    sortPatients(result, sortType);
  };

  const sortPatients = (list: any[], type: string) => {

    let sorted = [...list];

    if (type === "az") {
      sorted.sort((a, b) => a.name.localeCompare(b.name, "th"));
    }

    if (type === "za") {
      sorted.sort((a, b) => b.name.localeCompare(a.name, "th"));
    }

    setFilteredPatients(sorted);
  };

  const changeSort = (type: string) => {

    setSortType(type);

    sortPatients(filteredPatients, type);
  };

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar color="primary">

          <IonButtons slot="start">
            <IonButton onClick={() => history.goBack()}>
              <IonIcon icon={arrowBack} />
            </IonButton>
          </IonButtons>

          <IonTitle>รายชื่อคนไข้</IonTitle>

        </IonToolbar>
      </IonHeader>

      <IonContent className="patient-bg">

        <IonSearchbar
          value={searchText}
          placeholder="ค้นหาชื่อคนไข้"
          onIonInput={(e: any) => handleSearch(e.target.value)}
        />

        <IonSegment
          value={sortType}
          onIonChange={(e) => changeSort(e.detail.value as string)}
        >

          <IonSegmentButton value="az">
            <IonIcon icon={textOutline} />
            <IonLabel>ก-ฮ</IonLabel>
          </IonSegmentButton>

          <IonSegmentButton value="za">
            <IonIcon icon={swapVerticalOutline} />
            <IonLabel>ฮ-ก</IonLabel>
          </IonSegmentButton>

        </IonSegment>

        {/* Patient Cards */}

        {filteredPatients.map((patient) => (

          <div
            key={patient._id}
            className="patient-card"
            onClick={() => goDetail(patient._id)}
          >

            <div className="patient-left">

              <IonAvatar>
                {patient.image ? (
                  <img src={patient.image} alt="patient" />
                ) : (
                  <IonIcon icon={personCircle} className="patient-icon" />
                )}
              </IonAvatar>

              <div className="patient-info">
                <div className="patient-name">{patient.name}</div>
                <div className="patient-phone">{patient.phone}</div>
              </div>

            </div>

            

          </div>

        ))}

      </IonContent>

    </IonPage>
  );
};

export default PatientList;