import SAXParser from "../../app/SAXParser";

const parser = new SAXParser();


const asyncCalendarText = day => {
    return new Promise(function (resolve, reject) {
        const currentDay = new Date(),
            jobDate = new Date(currentDay.getFullYear(), currentDay.getMonth(),
                currentDay.getDate() + day),
            dateFormater = val => val < 10 ? '0' + val :  val,
            year = jobDate.getFullYear(),
            month = dateFormater(jobDate.getMonth() + 1),
            dateMonth =dateFormater(jobDate.getDate())

        const xhr = new XMLHttpRequest();
        xhr.open('get', `http://prihod.ru/days/?cd=${year}-${month}-${dateMonth}`, true);
        xhr.setRequestHeader("Content-Type", "text/plain");
        xhr.setRequestHeader("Accept", "text/html");
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {

                //resolve(this.response);
                //debugger
            }else {
                console.log('Fetch Error Calendar Text :-S', this.status);
                resolve(1)
            }
        };
        xhr.onerror = function (err) {
            console.log('Fetch Error Calendar Text :-S', err);
            resolve(1)
        }
        xhr.send()


    });
}
