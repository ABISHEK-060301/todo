export const checked = (array, id, value) => {

    let temp = array.map((content) => {
        if (content.id === id) {
            return { ...content, checked: value }
        } else {
            return content;
        }
    })
    return temp;
}
