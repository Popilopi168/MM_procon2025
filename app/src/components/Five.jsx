import rin from "../assets/rin.png";
import ren from "../assets/ren.png";
import luka from "../assets/luka.png";
import kaito from "../assets/kaito.png";
import meiko from "../assets/meiko.png";

export default function Five() {
    return (
      <div className="flex flex-row justify-center items-center max-w-xs mx-auto p-5 absolute bottom-[-85px] left-1/4">
        <img src={rin}  alt="rin" className="w-[40%] h-[40%] animate-rock"/>
        <img src={ren}  alt="ren" className="w-[40%] h-[40%] animate-rock"/>
        <img src={luka} alt="luka" className="w-[40%] h-[40%] animate-rock"/>
        <img src={kaito}alt="kaito" className="w-[40%] h-[40%] animate-rock"/>
        <img src={meiko}alt="meiko" className="w-[40%] h-[40%] animate-rock"/>
      </div>
    );
  }
  