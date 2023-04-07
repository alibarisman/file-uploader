sap.ui.define([], function () {
	"use strict";

	return {

		fileIcon: function (val) {
			let icon = "";

			switch (val) {
				case "application/pdf":
					icon = "sap-icon://pdf-attachment";
					break;
				case "image/jpeg":
					icon = "sap-icon://attachment-photo";
					break;
				case "image/png":
					icon = "sap-icon://attachment-photo";
					break;
				case "image/gif":
					icon = "sap-icon://attachment-photo";
					break;
				case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
					icon = "sap-icon://excel-attachment";
					break;
				case "text/csv":
					icon = "sap-icon://excel-attachment";
					break;
				case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
					icon = "sap-icon://doc-attachment";
					break;
				case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
					icon = "sap-icon://ppt-attachment";
					break;
				case "application/x-zip-compressed":
					icon = "sap-icon://attachment-zip-file";
					break;
				case "text/html":
					icon = "sap-icon://attachment-html";
					break;
				default:
					icon = "sap-icon://document";
			}

			return icon;
		}
        
	};
});