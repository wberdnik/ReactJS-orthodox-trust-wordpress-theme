import SAXParser from "../../app/SAXParser";

export default function CalendarAction(dispatch){
    let content = [
        /*  {
              day: 20,
              month: 'августа',
              weekday: 'Четверг',
              oldstyle: '07 августа',
              text: '<p>Попразднство Преображения Господня. Прмч. Дометия Персянина и двух учеников его (363). <b>Обретение мощей свт. Митрофана, еп. Воронежского</b> (1832). Прп. Антония Оптинского (1865).</p><p>Прп. Пимена Многоболезненного, Печерского, в Ближних пещерах (1110). Прп. Пимена, постника Печерского, в Дальних пещерах (XIII–XIV). Прп. Меркурия Печерского, еп. Смоленского, в Ближних пещерах (1239). Мчч. Марина и Астерия (260). Прп. Ора (ок. 390). Прмц. Потамии чудотворицы. Прп. Феодосия Нового (IX–X). Свт. Иерофея Венгерского (X). Св. Стефана I, короля Венгрии (1038). Прп. Феодоры Сихловской (начало XVIII) (Румын.).</p><p>Сщмчч. Александра Хотовицкого, Петра Токарева, Михаила Плышевского, Иоанна Воронца, Димитрия Миловидова и Алексия Воробьева пресвитеров, Елисея Штольдера диакона и прмч. Афанасия Егорова (1937); сщмч. Василия Аменицкого пресвитера (1938).</p><p>@Утр. – Ин., 35 зач. (от полу’), X, 1–9<a class="snsa" name="snstext1" href="#snscmnt1"><sup>1</sup></a>. Лит. – 2 Кор., 175 зач., IV, 1–6. Мф., 99 зач., XXIV, 13–28. Свт.: Евр., 318 зач., VII, 26 – VIII, 2. Ин., 36 зач., X, 9–16, или прмч.: Еф., 233 зач., VI, 10–17. Ин., 52 зач., XV, 17 – XVI, 2<a class="snsa" name="snstext2" href="#snscmnt2"><sup>2</sup></a>.@</p>',
              img: 'https://days.pravoslavie.ru/jpg/is4431.jpg'
          },*/
    ]

    const head = document.getElementsByTagName('head').item(0)

    const asyncCalendarIcon = day => new Promise(function (resolve, reject) {
        const script = document.createElement('script')
        script.src = `http://script.pravoslavie.ru/icon.php?advanced=2&tmshift=${day * 24}`
        script.type = 'text/javascript'
        script.async = !0
        script.onerror = a => {
            head.removeChild(a.target);
            resolve(1)
        }
        script.onload = a => {
            const {dayicon: day_icon} = window,
                oldYear = +day_icon.monthnew === 1 && +day_icon.daynew < 14 ? +day_icon.year - 1 : +day_icon.year,
                dateOld = new Date(oldYear, (+day_icon.monthold) - 1, +day_icon.dayold),
                dateNew = new Date(+day_icon.year, (+day_icon.monthnew) - 1, +day_icon.daynew),
                week = dateNew.toLocaleString("ru", {weekday: 'long'})

            content.push({
                day: +day_icon.daynew,
                month: dateNew.toLocaleString("ru",
                    {month: 'long', day: 'numeric'}).split(' ')[1],
                weekday: week[0].toLocaleUpperCase() + week.slice(1),
                oldstyle: dateOld.toLocaleString("ru",
                    {month: 'long', day: 'numeric',}),
                text: `<p>${day_icon.text}</p>`,
                alt: day_icon.text,
                img: day_icon.src,
                glide: day,
            })

            head.removeChild(a.target)
            resolve(2)
        }
        head.appendChild(script)
    })


    asyncCalendarIcon(-2)
        // .then(response => asyncCalendarText(-1))
        .then(response => asyncCalendarIcon(-1))
        .then(response => asyncCalendarIcon(0))
        .then(response => asyncCalendarIcon(1))
        .then(response => asyncCalendarIcon(2))
        .then(response => asyncCalendarIcon(3))
        .then(response => asyncCalendarIcon(4))
        .finally(x => dispatch({
            type: 'loadedCalendar',
            data: content
        }))
}
