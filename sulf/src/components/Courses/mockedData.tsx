export const courses = [
    {
        id: 1,
        title: 'Java course',
        image: 'http://elearning-reskill.eu/pluginfile.php/99/course/overviewfiles/products-online-courses.png',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, perferendis aspernatur quod molestias, quae dolor iure voluptatum ut eius hic dicta blanditiis unde aliquid possimus at nemo, numquam voluptatibus quidem.'
    },
    {
        id: 2,
        title: 'Computer science course',
        image: 'https://loyer.com.ua/wp-content/uploads/2020/04/How-short-online-courses-can-actually-help-in-career.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, perferendis aspernatur quod molestias, quae dolor iure voluptatum ut eius hic dicta blanditiis unde aliquid possimus at nemo, numquam voluptatibus quidem.'
    },
    {
        id: 3,
        title: 'JavaScript course',
        image: 'https://bexruz.ru/uploads/post/photo_1627044170515_e67644f5db151bd5ba6a8528bc6c06ce.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, perferendis aspernatur quod molestias, quae dolor iure voluptatum ut eius hic dicta blanditiis unde aliquid possimus at nemo, numquam voluptatibus quidem.'
    },
    {
        id: 4,
        title: 'Node JS course',
        image: 'http://rusfocus.com/wp-content/uploads/2017/10/Best-Online-Course-Providers.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, perferendis aspernatur quod molestias, quae dolor iure voluptatum ut eius hic dicta blanditiis unde aliquid possimus at nemo, numquam voluptatibus quidem.'
    },
    {
        id: 5,
        title: 'Mongo DB course',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSokFzau8ua3K41ExMnW-Zx8RWv16WMOo1-sK5DeuzLQo5UlEOnIcfn0R-zLTcIRdUfRSI&usqp=CAU',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, perferendis aspernatur quod molestias, quae dolor iure voluptatum ut eius hic dicta blanditiis unde aliquid possimus at nemo, numquam voluptatibus quidem.'
    },
    {
        id: 6,
        title: 'Python course',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhgdCaSqs5PSV_85EU2oEXtmcV1_09PqV6kBTQet7agc6CRtvM9vJAprx0AyqmLIHkdNY&usqp=CAU',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, perferendis aspernatur quod molestias, quae dolor iure voluptatum ut eius hic dicta blanditiis unde aliquid possimus at nemo, numquam voluptatibus quidem.'
    },
    {
        id: 7,
        title: 'Express JS course',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPb7BY-kMQ_Ez1LLW4D-pnwJaSbwujRE5snQfoIYfE8DeJfptt6hE81YbW-YS6is7ETaw&usqp=CAU',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, perferendis aspernatur quod molestias, quae dolor iure voluptatum ut eius hic dicta blanditiis unde aliquid possimus at nemo, numquam voluptatibus quidem.'
    },
    {
        id: 8,
        title: 'PostgreSQL DB course',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYgtZLcjkmlInZmezPgmlzJ-ag5yjrTgnT3w&usqp=CAU',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, perferendis aspernatur quod molestias, quae dolor iure voluptatum ut eius hic dicta blanditiis unde aliquid possimus at nemo, numquam voluptatibus quidem.'
    },
    {
        id: 9,
        title: 'TypeScript course',
        image: 'https://img-cdn.inc.com/image/upload/w_1920,h_1080,c_fill/images/panoramic/getty_1187833318_2000133220009280118_mbtvwq.jpg',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, perferendis aspernatur quod molestias, quae dolor iure voluptatum ut eius hic dicta blanditiis unde aliquid possimus at nemo, numquam voluptatibus quidem.'
    },
];

export const getCourseById = (id: number) => {
    return courses.filter(course => course.id === id)
}