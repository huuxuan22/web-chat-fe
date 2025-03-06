const MessageCard = ({isRequest, content}) => {
    
  return (
    <div
      className={`py-2 px-2 rounded-md max-w-[50%]  ${
        isRequest ? "self-end bg-[#000000dd] ml-auto mr-5 mt-3" : "self-start bg-[#40e812dd] mr-auto ml-5 mt-3"
      }`}
    >
      <p className="text-white">{content} hello mọi người</p>
    </div>
  );
};
export default MessageCard;
