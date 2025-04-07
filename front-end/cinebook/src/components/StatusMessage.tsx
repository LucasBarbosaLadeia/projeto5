interface StatusMessage {
    message: string;
  }
  
  const StatusMessage = ({ message }: StatusMessage) => {
    return (
      <p style={{ textAlign: "center", marginTop: "2rem", fontSize: "1.2rem" }}>
        {message}
      </p>
    );
  };
  
  export default StatusMessage;
  