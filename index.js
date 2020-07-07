navigator.webkitGetUserMedia({ video: true, audio:false}, function(stream){
  var Peer = require('simple-peer')
  var peer = new Peer({
    initiator: location.hash === '#init',
    trickle: false,
    stream: stream
  })

  peer.on('signal', function (data) {
    document.getElementById('yourId').value = JSON.stringify(data)
  })
  document.getElementById('connect').addEventListener('click', function () {
    var otherId = JSON.parse(document.getElementById('otherId').value)
    peer.signal(otherId)
  })

  document.getElementById('send').addEventListener('click', function () {
    var yourMessage =document.getElementById('yourMessage').value
    var myName = document.getElementById('myName').value
    yourMessage = myName + ':  ' + yourMessage
    peer.send(yourMessage)

    document.getElementById('messages').textContent += yourMessage +'\n'
  })

  peer.on('data', function (data) {
    document.getElementById('messages').textContent += data +'\n'
  })

  peer.on('stream', function(stream) {
    var video = document.createElement('video')
    document.body.appendChild(video)

    // video.src= window.URL.createObjectURL(stream)
    video.srcObject = stream
    video.play()
  })

//Website Interaction Code
  document.getElementById('confirm').onclick = function () {
    document.getElementById('userName').textContent= document.getElementById('myName').value
    document.querySelector('#userIn').style.display= 'none'
  }
  document.getElementById('chngUser').onclick = function () {
    document.getElementById('userIn').style.display= 'block'
  }
  document.getElementById('hideDetails').onclick = function () {
    document.querySelector('#showDetails').style.display= 'block'
    document.getElementById('connectionDetails').style.display= 'none'
    document.getElementById('hideDetails').style.display= 'none'
  }
  document.getElementById('showDetails').onclick = function () {
    document.querySelector('#connectionDetails').style.display= 'block'
    document.querySelector('#hideDetails').style.display= 'block'
    document.querySelector('#showDetails').style.display= 'none'
  }
  document.getElementById('connect').onclick =function () {
    document.querySelector('#userOut').style.display= 'block'
    document.getElementById('controls').style.display= 'block'
  }
  document.getElementById('showText').onclick =function () {
    document.getElementById('textChat').style.display= 'block'
  }
  // document.getElementById('showVideo').onclick =function () {
  //   document.getElementById('video').style.display= 'block'
  // }
// End of Website Interaction

}, function (err){
  console.error(err)
}
)
