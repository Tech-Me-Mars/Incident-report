import { format } from 'date-fns';

// ************* customDateFormat ************
// ใช้เวลาแสงผลวันที่ให้ถูกต้อง
// export const customDateFormat = (date) => {
//     if (date) {
//       const thaiYear = new Date(date).getFullYear() + 543;
//       return format(new Date(date), `dd/MM/${thaiYear}`);
//     }
//   };
  const thaiMonths = [
    'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 
    'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
  ];
  
  export const customDateFormat = (date) => {
    if (date) {
      const jsDate = new Date(date);
      const thaiYear = jsDate.getFullYear() + 543;
      const day = jsDate.getDate();
      const month = thaiMonths[jsDate.getMonth()];
      return `${day} ${month} ${thaiYear}`;
    }
  };

// ใช้กับ calendar
export const formatDate = (value) => {
  if (!value) {
    return ""; // หรือค่าที่คุณต้องการในกรณีที่ไม่มีค่า
  }
  if (!(value instanceof Date)) {
    // ในกรณีที่ value ไม่ใช่ Date object
    // คุณอาจต้องแปลง value เป็น Date object ก่อน
    value = new Date(value);
  }
  return value.toLocaleDateString("th-TH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const formatDateTime = (value) => {
  if (!value) {
    return ""; // หรือค่าที่คุณต้องการในกรณีที่ไม่มีค่า
  }
  if (!(value instanceof Date)) {
    // ในกรณีที่ value ไม่ใช่ Date object
    // คุณอาจต้องแปลง value เป็น Date object ก่อน
    value = new Date(value);
  }
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return value.toLocaleDateString("th-TH", options);
};

export const formatCurrency = (value) => {
  if (typeof value === "string") {
    value = value.replace(",", "");
  }
  value = parseFloat(value);
  return value.toLocaleString("th-TH", { style: "currency", currency: "THB" });
};

export const formatNumber = (value) => {
  value = parseInt(value);
  return value.toLocaleString({ style: "currency", currency: "THB" });
};

export const formatNumberDecimal = (value) => {
  value = parseFloat(value); // แปลงค่าเป็น float เพื่อรองรับทศนิยม
  return value.toLocaleString({ style: 'currency', currency: 'THB', minimumFractionDigits: 2, maximumFractionDigits: 2 });
};



export const limitLengthAndNumber = (event,length) => {
  if (!/^\d$|^Backspace$|^Delete$/.test(event.key)) {
    event.preventDefault();
    return;
  }
  let inputValue = event.target.value;
  if (
    inputValue.length >= length &&
    event.key !== "Backspace" &&
    event.key !== "Delete"
  ) {
    event.preventDefault();
    return;
  }
};

export const validatePhoneNumber = (event) => {
  let number = (event.target.value + event.key).replace(/\D/g, "");

  if (
    (number.length >= 2 && ["0", "1", "7", "4"].includes(number[1])) ||
    !["0"].includes(number[0])
  ) {
    event.preventDefault();
    // supplier_phone.value = supplier_phone.value;
  }
};

export const roundToTwoDecimalPlaces =(number)=> {
    // ใช้ parseFloat เพื่อแปลงค่าเป็นทศนิยม (หากยังไม่ได้เปลี่ยน)
    const roundedNumber = parseFloat(number.toFixed(2));
    return roundedNumber;
  }