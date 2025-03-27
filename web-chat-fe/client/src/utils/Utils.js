export const formatRelativeTime = (input) => {
    if (!input) {
        return "Chưa có tin nhắn"; // hoặc: return "";
    }

    let date;
    if (Array.isArray(input) && input.length >= 6) {
        const [year, month, day, hour, minute, second] = input;
        date = new Date(year, month - 1, day, hour, minute, second);
    } else if (typeof input === "string") {
        date = new Date(input);
        if (isNaN(date.getTime())) {
            return "Dữ liệu không hợp lệ";
        }
    } else {
        return "Dữ liệu không hợp lệ";
    }

    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} giây trước`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} giờ trước`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} ngày trước`;
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks === 1) return `1 tuần trước`;

    return `${diffInWeeks} tuần trước`;
};
export const formatTimestamp = (arr) => {
    if (!Array.isArray(arr) || arr.length < 6) return null;
  
  const [year, month, day, hour, minute, second] = arr;
  
  // JavaScript Date: month - 1
  const date = new Date(year, month - 1, day, hour, minute, second);

  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');
  
  // Format theo yêu cầu: giờ:phút:giây ngày/tháng/năm
  return `${hh}:${min}:${ss} ${dd}/${mm}/${yyyy}`;
  }
