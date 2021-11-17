/* eslint-disable */ 
const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
const analyser = audioCtx.createAnalyser()
var source;

function createSource(audioElement) {
    source = audioCtx.createMediaElementSource(audioElement)
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    return analyser;
}

export { audioCtx,createSource }
