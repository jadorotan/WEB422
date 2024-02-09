/********************************************************************************
*  WEB422 – Assignment 2
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Jerus Allen Dorotan Student ID: 110225216 Date: 02-09-2024
*
********************************************************************************/

//This will keep track of the current page that the user is viewing.  Set it to 1 as the default value
var page = 1;

//This will be a constant value that we will use to reference how many listings we wish to view on each page of our application.  For this assignment, we will set it to 10.
var perPage = 10;

//This will keep track of the current "search" value.  Since the page will not load with any predefined search value, it should be set to null as the default value
var searchName = '';

function loadListingsData(){
    var url = `https://drab-blue-bullfrog-boot.cyclic.app`;

    fetch(`${url}/api/listings?page=${page}&perPage=${perPage}&name=${searchName}`)
    .then(res => {
        return res.ok ? res.json() : Promise.reject(res.status);
    })
    .then(data => {
        if(data.length){
            // non-empty array (listings available)
            var listingsRows = `${data.map((listing) => (
            `<tr data-id="${listing._id}">
                <td>${listing.name}</td>
                <td>${listing.room_type}</td>
                <td>${listing.address.street}</td>
                <td>${listing.summary}<br><br>
                <strong>Accommodates:</strong> ${listing.accommodates}<br>
                <strong>Rating:</strong> ${listing.review_scores.review_scores_rating} (${listing.number_of_reviews} Reviews)</td>
            </tr>`)).join('')}`;

            document.querySelector("#listingsTable tbody").innerHTML = listingsRows;
            document.querySelector('#current-page').textContent = page;
            
            document.querySelectorAll('#listingsTable tbody tr').forEach((row) => {
                row.addEventListener('click', (e) => {
                let clickedId = row.getAttribute('data-id');

                fetch(`https://drab-blue-bullfrog-boot.cyclic.app/api/listings/${clickedId}`)
                .then((res) => {
                    return res.ok ? res.json() : Promise.reject(res.status);
                })
                .then((data) => {
                    document.querySelector('#detailsModal .modal-title').textContent = data.name;
                
                    let modalBody = `
                        <img id="photo" onerror="this.onerror=null;this.src='https://placehold.co/600x400?text=Photo+Not+Available'" class="img-fluid w-100" src="${data.images.picture_url}"><br><br>
                        ${data.neighborhood_overview}<br><br>
                        <strong>Price:</strong> $${data.price.toFixed(2)}<br>
                        <strong>Room:</strong> ${data.room_type}<br>
                        <strong>Bed:</strong> ${data.bed_type} (${data.beds})<br><br>
                    `; 
        
                    document.querySelector('#detailsModal .modal-body').innerHTML = modalBody;
                
                    let myModal = new bootstrap.Modal(document.getElementById('detailsModal'), {
                        backdrop: 'static',
                        keyboard: false,
                        focus: true
                    });
                    
                    myModal.show();
                });
                
                });
            });

        } else {
            // empty array (no listings available)
            if(page > 1){
                page--;
            }

            else{
                var listingsTable = document.getElementById("listingsTable");
                listingsTable.innerHTML = `<tr><td colspan="4"><strong>No data available</td></tr>`
            }
        }
    }).catch(err => {
        // error (no listings available)
        let msg = `<tr><td colspan="4"><strong>No data available</td></tr>`;
        document.querySelector('#listingsTable tbody').innerHTML = msg;
    });

}

//The remainder of the code within main.js must be executed when the "DOM is ready", ie: once the 
//"DOMContentLoaded" event has fired for the "document" object:
document.addEventListener('DOMContentLoaded', () => {
	loadListingsData();

    //Click event for the "previous page" pagination button: 
	document.querySelector('#previous-page').addEventListener('click', (e) => {
		if (page > 1) {
			page--;
			loadListingsData();
		}
	});

	//Click event for the "next page" pagination button
	document.querySelector('#next-page').addEventListener('click', (e) => {
		page++;
		loadListingsData();
	});

	//Submit event for the "searchForm" form:
	document.querySelector('#searchForm').addEventListener('submit', (e) => {
		e.preventDefault();
		searchName = document.querySelector('#name').value;
		page = 1;
		loadListingsData();
	});

	//Click event for the "clearForm" button:
	document.querySelector('#clearForm').addEventListener('click', (e) => {
        document.querySelector('#name').value = null;
		searchName = null;
		page = 1;
		loadListingsData();
	});
});
