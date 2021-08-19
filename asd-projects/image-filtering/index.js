// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads and is where you should call your functions.
$(document).ready(function(){
    const $display = $('#display');

    // TODO: Call your apply function(s) here
    // applyFilter(reddify);
    applyFilterNoBackground(reddify);
    applyFilterNoBackground(decreaseBlue);
    applyFilter(increaseGreenByBlue);




    render($display, image);
});

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here
function applyFilter(filterFunction) {
    for (var r = 0; r < image.length; r++) {
        for (var c = 0; c < image[r].length; c++) {
            var str = image[r][c];
            var nums = rgbStringToArray(str);
            nums = filterFunction(nums);
            str = rgbArrayToString(nums);
            image[r][c] = str;
        }
    }
}

function applyFilterNoBackground(filterFunction) {
    var backgroundColor = image[0][0];
    for (var r = 0; r < image.length; r++) {
        for (var c = 0; c < image[r].length; c++) {
            var str = image[r][c];
            if (str !== backgroundColor) {
                var nums = rgbStringToArray(str);
                nums = filterFunction(nums);
                str = rgbArrayToString(nums);
                image[r][c] = str;
            }
        }
    }
}


// TODO 6: Create the applyFilterNoBackground function


// TODO 3 & 5: Create filter functions
function reddify(array) {
    array[RED] = 255;
    return array;
}

function keepInBounds(num){
    return Math.max(Math.min(255, num), 0);   
}

function decreaseBlue(array) {
    array[BLUE] = keepInBounds(array[BLUE] - 50);
    return array;
}

function increaseGreenByBlue(array) {
    array[GREEN] = keepInBounds(array[GREEN] + array[BLUE]);
    return array;
}

// CHALLENGE code goes below here
