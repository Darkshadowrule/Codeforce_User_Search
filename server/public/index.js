var socket=io();
socket.on('takeinfo',function(data){
  var li=jQuery('<ul></ul>');
  var l=jQuery('<ul></ul>')
  if(typeof(data)=="string"){
    li.append("Userhandle doesnot exist")
    jQuery('#name').append(li)
  }else {
    li.append(`Name:${data.result[0].firstName}`+" "+`${data.result[0].lastName}`+"<br />"+` Current rating: ${data.result[0].rating}`+"<br />"+`Current rank:${data.result[0].rank}\n`);
    li.append("<br />"+` Maximum Rating:${data.result[0].maxRating}`)
    li.append("<br />"+`Maximum Rank:${data.result[0].maxRank}`)
    li.append("<br />"+`Country: ${data.result[0].country}`)
    li.append("<br />"+`Friends: ${data.result[0].friendOfCount}`)
    li.append("<br />"+`Contribution: ${data.result[0].contribution}`)
    li.append("<br/>"+`Last Online On:${data.result[0].lastOnlineTimeSeconds}`)
    li.append("<br/>"+`Registered On:${data.result[0].registrationTimeSeconds}`)
    l.html(`<img src=${data.result[0].avatar} height="64px" width="64px">`);
    jQuery('#name').append(l)
    jQuery('#name').append(li)
  }
})
jQuery('#search').on('submit',function(e){
  e.preventDefault();
  socket.emit('newMessage',{
    text:jQuery('[name=userhandle]').val()
  },function(){

  });
});
