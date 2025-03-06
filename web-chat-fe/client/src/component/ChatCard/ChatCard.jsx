


const ChatCard = ({item}) => {
    console.log("đã đi vào chatCard");
    
    return (
        <div className="flex items-center justify-between py-2 group cursor-pointer">
            <div className="w-[20%]">
                <img className="h-14 w-14 rounded-full" 
                src="https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg" alt="" />
            </div>                
            <div className="pl-5 w-[80%]">
                <div className="flex justify-between items-center">
                    <p className="text-lg">{item.fullName}</p>
                    <p className="text-sm">timesamp</p>
                </div>
                <div className="flex justify-between items-center">
                    <p>mess......</p>
                    <div className="flex space-x-2 items-center">
                        <p className="text-xs py-1 px-2 text-white bg-green-400 rounded-full">6</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ChatCard;