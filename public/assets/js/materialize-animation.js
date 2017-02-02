  $(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
    $('#modal1').modal('open');
    $('#modal1').modal('close');
  });