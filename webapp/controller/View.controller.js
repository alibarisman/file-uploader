sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"../model/formatter"
], function(Controller, formatter) {
	"use strict";

	return Controller.extend("file-uploader.controller.View", {
		formatter: formatter,

            onInit: function () {

            },

            onAddAttachment: function (oEvent) {
                let oFileUploader = this.getView().byId("fileUploader");
                let fileName = oFileUploader.getValue();

                if (!fileName) {
                    this.getView().byId("fileUploader").setValueState("Error");
                    sap.m.MessageToast.show("Please select a file");
                    return;
                }

                this.getView().byId("fileUploader").setValueState("None");
                oFileUploader.upload();
            },

            onUpload: async function (oEvent) {
                let oFileUploader = this.byId("fileUploader");
                let fileModel = this.getOwnerComponent().getModel("file");
                let aFiles = [];

                for (let i = 0; i < jQuery.sap.domById(oFileUploader.getId() + "-fu").files.length; i++) {
                    aFiles.push(jQuery.sap.domById(oFileUploader.getId() + "-fu").files[i]);
                }

                let fileList = await Promise.all(aFiles.map(f => { return this.readAsDataURL(f) }));

                fileList.forEach(element => {
                    fileModel.getProperty("/fileSet").push(element);
                });

                this.getView().byId("title").setText("File List" + " (" + fileList.length + ")");
                fileModel.refresh();

                setTimeout(() => {
                    oFileUploader.clear();
                }, 1000);
            },

            readAsDataURL: function (file) {
                return new Promise((resolve, reject) => {
                    let fileReader = new FileReader();
                    fileReader.onload = function () {
                        return resolve({ data: fileReader.result, name: file.name, size: file.size, type: file.type });
                    }
                    fileReader.readAsDataURL(file);
                })
            },

            onDownloadAttachment: function (oEvent) {
                let oBindingContext = oEvent.getSource().getBindingContext("file");
                let sPath = oBindingContext.getPath();
                let oUIModel = this.getOwnerComponent().getModel("file");
                let oSelAttach = oUIModel.getProperty(sPath);
                let sBase64Str = oSelAttach.data;
                let link = document.createElement("a");

                link.setAttribute("href", sBase64Str);
                link.setAttribute("download", oSelAttach.name);
                link.style.cssText = 'visibility:hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            },

            onDeleteAttachment: function (oEvent) {
                let sPath = oEvent.getSource().getBindingContext("file").getPath();
                let indexs = sPath.split("/").slice(-1);
                let sIndex = indexs[0];
                let oFileModel = this.getOwnerComponent().getModel("file");
                let sRow = oFileModel.getProperty(sPath);
                let data = oFileModel.getProperty("/fileSet");

                data.splice(sIndex, 1);
                oFileModel.refresh();
                this.getView().byId("title").setText("File List" + " (" + data.length + ")");
            }
	});
});