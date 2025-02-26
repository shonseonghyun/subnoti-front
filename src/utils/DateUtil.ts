export interface Idate{
    year:string,
    month:string,
    date: string,
    day: string
}

const getWeek = (day:number)=>{
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    return week[day];
}

export const getDatesStartToLast = (startDate:Date, lastDate:Date) => {
    const result: Idate[] = [];
    while (startDate <= lastDate) {
        // startDate.toISOString().split('T')[0] / ex)2024-08-26
        let year = startDate.getFullYear().toString();
        let month = getMonthByFormat(startDate.getMonth());
        let day =  getWeek(startDate.getDay());
        let date = getDateByFormat(startDate.getDate());

        result.push({year,month,date,day}); 

        startDate.setDate(startDate.getDate() + 1);
    }
    return result;
  };

  export const getDatesTodayToTwoWeeksLater = () => {
    const today = new Date();
    const twoWeekLater = new Date(today);
    twoWeekLater.setDate(today.getDate()+13);

    return getDatesStartToLast(today,twoWeekLater); 
  };

  export const getMonthByFormat = (month:number)=>{
    return (month + 1).toString().length==1 ? "0"+(month + 1).toString() : (month + 1).toString()
  }

  export const getDateByFormat = (date:number)=>{
    return date.toString().length==1 ? "0"+date.toString() : date.toString()
  }

  export const getToday = () =>{
    const dt = new Date();
    const year = dt.getFullYear().toString();
    const month = getMonthByFormat(dt.getMonth()); 
    const date = getDateByFormat(dt.getDate());    
    const today = year+ month+date;
    return today;
  }

  export function formatDateTime(dateTimeStr:string) {
    // 문자열에서 연도, 월, 일, 시간, 분을 추출
    const year = parseInt(dateTimeStr.substring(0, 4));
    const month = parseInt(dateTimeStr.substring(4, 6), 10) - 1; // JavaScript의 월은 0부터 시작하므로 1을 빼줍니다.
    const day = parseInt(dateTimeStr.substring(6, 8), 10);
    const hour = parseInt(dateTimeStr.substring(8, 10), 10);
    const minute = parseInt(dateTimeStr.substring(10, 12), 10);

    // 날짜 객체 생성
    const date = new Date(year, month, day, hour, minute);

    // 포맷팅된 날짜 문자열 생성
    const formattedDateTime = `${month + 1}월 ${day}일 ${getWeek(date.getDay())}요일 ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

    return formattedDateTime;
}