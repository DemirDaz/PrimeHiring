window.icons = {
    paginationSwitchDown: 'fa-caret-square-down',
    paginationSwitchUp: 'fa-caret-square-up',
    refresh: 'fa fa-refresh',
    toggleOff: 'fa-toggle-off',
    toggleOn: 'fa-toggle-on',
    columns: 'fa-th-list',
    fullscreen: 'fa-arrows-alt',
    detailOpen: 'fa-plus',
    detailClose: 'fa-minus'
  };



  var $table1 = $('#table1');
  var $table = $('#table2');
  var $table3 = $('#table3');
  var $remove = $('#hire');
  var $refresh = $('#refresh');
  var $hire = $('#hire');
  var $createBtn = $('#createBtn');
  var $createForm = $('#createForm');



  // PREVENT CLOSING FORM IF THERE ARE ERRORS.
  
    // Loop over them and prevent submission
    /* 
    (function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
          form.classList.add('was-validated')
        }, false)
      })
  })()
    */

  $(document).ready(function () {

    $(".table2").attr("data-url", "http://localhost/PrimeHiring/getAvailable.php?start=%27" + $('#startDate').val() + "%27");
    $table.bootstrapTable('refresh');

    //create form submission
    $("#createBtn").on("click", function (e) {
      var form = $("#createForm")[0];
      var isValid = form.checkValidity();
      if (!isValid) {
        e.preventDefault();
        e.stopPropagation();
      } else {
        //only post data if is valid 
        $.post("http://localhost/PrimeHiring/createDeveloper.php",
          $("#createForm").serialize()).done(function (data) {
            alert("Response: " + data);
          });
      }
      form.classList.add('was-validated');
    });


    $("#updateForm").submit(function( event ) {
      //console.log($("#updateForm").serializeArray());
      
      var form2 = $("#updateForm")[0];
      var isValid = form2.checkValidity();
      if (!isValid) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        //checking data
        //console.log($("#updateForm").serializeArray());
        //only post data if is valid 
        $.post("http://localhost/PrimeHiring/updateDeveloper.php",
          $("#updateForm").serialize()).done(function (data) {
            alert("Response: " + data);
          }); 
      }
      form2.classList.add('was-validated');
      });

    //update form submission
    

  });


  function getDate() {
    return $('#startDate').val();
  }


  window.operateEvents = {
    'click .edit': function (e, value, row, index) {

      // alert('You click like action, row: ' + JSON.stringify(row));
      $('#idU').val(row['id']);
      $('#NameU').val(row['Name']);
      $('#EmailU').val(row['Email']);
      $('#PhoneNumU').val(row['PhoneNum']);
      $('#LocationU').val(row['Location']);
      $('#PictureU').val(row['Picture']);
      $('#PricePerHourU').val(row['PricePerHour']);
      $('#TechnologyU').val(row['Technology']);
      $('#DescriptionU').val(row['Description']);
      $('#YearsOfExpU').val(row['YearsOfExp']);
      $('#NativeLangU').val(row['NativeLang']);
      $('#LinkedInU').val(row['LinkedIn']);


    },
    'click .remove': function (e, value, row, index) {
      //ajax request to delete in db
      $.get("http://localhost/PrimeHiring/deleteDeveloper.php?id=" + row['id'], function (data) {
        alert("Deleted developer.");
      });
      $table1.bootstrapTable('remove', {
        field: '$index',
        values: [index]
      })
    }
  }

  //disable hire btn if none selected
  $table.on('check.bs.table uncheck.bs.table ' +
    'check-all.bs.table uncheck-all.bs.table',
    function () {
      $hire.prop('disabled', !$table.bootstrapTable('getSelections').length);
      selections = getIdSelections();

    })

  //get selected row(s) id(s)
  function getIdSelections() {
    return $.map($table.bootstrapTable('getSelections'), function (row) {
      return row.id;
    })
  }



  $hire.click(function () {
    //hire dev(s)
    var ids = getIdSelections();
    var i = 0;
    for (i = 0; i < ids.length; i++) {
      var myJSON = '{ "developerId": "' + ids[i] + '", "startDate": "' + $('#startDate').val() + '", "endDate": "' + $('#endDate').val() + '" }';
      var myString = JSON.stringify(myJSON);
      //  alert(myString); 
      var param1 = ids[i];
      var param2 = $('#startDate').val();
      var param3 = $('#endDate').val();
      jQuery.ajax({
        url: 'http://localhost/PrimeHiring/createRecord.php',
        method: 'POST',
        data: { "developerId": param1, "startDate": "'" + param2.toString() + "'", "endDate": "'" + param3.toString() + "'" },
        success: function (data) {
          alert(data);
        },
        error: function (xhr, desc, err) {
          console.log(xhr);
          console.log("Details0: " + desc + "\nError:" + err);
        },
      });
    }
    $hire.prop('disabled', true);
  })

  var today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  $('#startDate').datepicker({
    uiLibrary: 'bootstrap4',
    iconsLibrary: 'fontawesome',
    minDate: today,
    format: 'yyyy-mm-dd',
    maxDate: function () {
      return $('#endDate').val();
    },  // on click..post request to php..get developers and list them
    change: function (e) {
      $table.bootstrapTable('refresh', {
        url: "http://localhost/PrimeHiring/getAvailable.php?start=%27" + $('#startDate').val() + "%27"
      });
    }

  });
  $('#endDate').datepicker({
    uiLibrary: 'bootstrap4',
    iconsLibrary: 'fontawesome',
    format: 'yyyy-mm-dd',
    minDate: function () {
      return $('#startDate').val();
    },
    // on click..post request to php..get developers and list them
    change: function (e) {
      //$(".table2").attr("data-url","http://localhost/PrimeHiring/getAvailable.php?start=%27"+ $('#startDate').val() +"%27");
      $table.bootstrapTable('refresh', {
        url: "http://localhost/PrimeHiring/getAvailable.php?start=%27" + $('#startDate').val() + "%27"
      });
      //validate($(this).val());
    }
  });

  // just to check data format
  function validate(dateText) {
    try {
      alert("You selected is : " + $("#endDate").val($.datepicker.formatDate('yy-mm-dd', new Date())));
    }
    catch (e) {
      alert("invalid date");
    };
  }

  function imageFormatter(value, row) {
    return '<img src="' + value + '"style="width:100px;height:100px;border-radius: 50%;"/>';
  }

  function operateFormatter(value, row, index) {
    return [
      '<a class="edit" href="javascript:void(0)" title="Edit" data-toggle="modal" data-target="#updateModal">',
      '<i class="fa fa-pencil fa-lg"></i>',
      '</a>  <br><br> ',
      '<a class="remove" href="javascript:void(0)" title="Remove">',
      '<i class="fa fa-trash fa-lg"></i>',
      '</a>'
    ].join('')
  }
