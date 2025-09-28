import React from "react";


const GoogleSheetEmbed: React.FC = () => {
  return (
    <div>
      <div className="mt-2 w-" style={{ width: "100%", height: "90vh", border: "none" }}>
        <iframe
          title="egram_swaraj"
          width="100%"
          height="100%"
          src="https://app.powerbi.com/reportEmbed?reportId=cbf37874-4655-4b49-95ec-35e51d7aa361&autoAuth=true&ctid=f429c41e-969b-484e-a6b5-49a3b3fac45a"
        //   frameborder="0"
        //   allowFullScreen="true"
        ></iframe>
      </div>
    </div>
  );
};

export default GoogleSheetEmbed;
