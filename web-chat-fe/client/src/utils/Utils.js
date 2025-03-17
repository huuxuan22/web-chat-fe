export const formatRelativeTime = (timeArray) => {
    if (!Array.isArray(timeArray) || timeArray.length < 6) {
        throw new Error("Dữ liệu không hợp lệ, cần mảng có 6 phần tử [year, month, day, hour, minute, second]");
    }

    const [year, month, day, hour, minute, second] = timeArray;
    const date = new Date(year, month - 1, day, hour, minute, second);
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

// Ví dụ sử dụng
console.log(formatRelativeTime([2025, 3, 9, 22, 9, 24])); // Kết quả thay đổi tùy thời gian hiện tại
