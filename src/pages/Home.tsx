import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonImg,
  IonRouterLink,
  IonLoading,
  IonToast,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./Home.css";

const Home: React.FC = () => {
  const history = useHistory();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleGuestLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInAnonymously(); // Creates unique Guest ID
    setLoading(false);

    if (error) {
      setErrorMsg("เกิดข้อผิดพลาด: " + error.message);
    } else {
      history.push("/dashboard");
    }
  };

  const handleLogin = async () => {
    if (!phone || !password) {
      setErrorMsg("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    setLoading(true);

    const email = `${phone}@myapp.com`;

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setLoading(false);
      setErrorMsg("เบอร์โทรหรือรหัสผ่านไม่ถูกต้อง");
      return;
    }

    // login สำเร็จ → เช็ค role
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    setLoading(false);

    if (profile?.role === "doctor") {
      history.push("/doctor-dashboard");
    } else {
      history.push("/dashboard");
    }
  };

  return (
    <IonPage>
      <IonLoading isOpen={loading} message={"กำลังเข้าสู่ระบบ..."} />
      <IonToast
        isOpen={!!errorMsg}
        message={errorMsg}
        duration={2000}
        onDidDismiss={() => setErrorMsg("")}
        color="danger"
      />

      <IonContent className="ion-padding login-background">
        <div className="login-container">
          <div className="logo-section">
            <IonImg src="assets/logo.png" className="app-logo" />
          </div>

          <h2 className="login-title">ลงชื่อเข้าใช้งาน</h2>

          <div className="input-group">
            <IonInput
              placeholder="เบอร์โทร"
              className="custom-input"
              type="tel"
              value={phone}
              onIonInput={(e: any) => setPhone(e.target.value)}
            />
            <IonInput
              placeholder="รหัสผ่าน"
              className="custom-input"
              type="password"
              value={password}
              onIonInput={(e: any) => setPassword(e.target.value)}
            />
            <p className="forgot-password">ลืมรหัสผ่าน?</p>
          </div>

          <div className="button-group">
            <IonButton
              expand="block"
              className="main-button"
              onClick={handleLogin}
            >
              เข้าสู่ระบบ
            </IonButton>
            <IonButton
              expand="block"
              className="main-button secondary"
              onClick={handleGuestLogin}
            >
              ไม่ใช้บัญชี
            </IonButton>
          </div>

          <div className="footer-text">
            <span>ยังไม่มีบัญชี </span>
            <IonRouterLink routerLink="/signup" className="register-link">
              ลงทะเบียน
            </IonRouterLink>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
