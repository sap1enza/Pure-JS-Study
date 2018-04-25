$(function() {
	var requestList = $.ajax({
		method: "GET",
		url:"post.php",
		data:{listAll:"list"},
		dataType:"json"
	});

	requestList.done(function(e) {
		console.log(e);
		var table;
		for(var k in e){
			table += '<tr>';
			table += '<th scope="row"> '+e[k].id+'</th>';
			table += '<td>'+e[k].name+'</td>';
			table += '<td>'+e[k].email+'</td>';
			table += '<td>'+e[k].tel+'</td>';
			table += '</td>';
		}
		$('#contacts').html(table);

	});


	$('#AjaxRequest').submit(function() {
		var form = $(this).serialize();
		var request = $.ajax({
			method: "POST",
			url:"post.php",
			data: form,
			dataType:"json"
		});

		request.done(function(e) {
			$('#msg').html(e.msg);

			if(e.status) {
				$('#AjaxRequest').each(function() {
					this.reset();
				});
				table = '<tr>';
				table += '<th scope="row"> '+e.contacts.id+'</th>';
				table += '<td>'+e.contacts.name+'</td>';
				table += '<td>'+e.contacts.email+'</td>';
				table += '<td>'+e.contacts.tel+'</td>';
				table += '</td>';
				$('#contacts').prepend(table);
			};

		});

		request.fail(function(e) {
			console.log(e);
		})

		request.always(function(e) {
			
		});
		return false;
	});



});