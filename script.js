let addDish = document.getElementById("addDish");

  addDish.addEventListener("click", ()=> {
    console.log("function saveDish");
    let newDish={
      "id":_id.innerText,
      "Name":dishName.value,
      "Description": description.value,
      "Price": price.value,
      "Image": image.value,
    }
    fetch('/dishes/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'},
      body:JSON.stringify(newDish)
        })
        .then((response)=>{
          console.log("Data uploaded successfully!")
          location.replace("/");
          console.log(response)
        })
      .catch((e)=>{
        console.log("error "+e)
      })});