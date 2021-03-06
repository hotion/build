Tea.context(function () {
	this.currentStep = "name";
	this.serverType = "proxy";

	this.$delay(function () {
		this.$find("form input[name='description']").focus();
	});

	this.go = function (step) {
		this.currentStep = step;
	};

	/**
	 * 名称
	 */
	this.description = "";
	this.nextName = function () {
		if (this.description.length == 0) {
			alert("请填入一个服务名称");
			this.$delay(function () {
				this.$find("form input[name='description']").focus();
			});
			return;
		}
		this.currentStep = "domain";
	};

	/**
	 * 域名
	 */
	this.nextDomain = function () {
		this.currentStep = "listen";
	};

	/**
	 * 域名
	 */
	this.names = [];
	this.nameAdding = false;
	this.addingNameName = "";
	this.nameEditingIndex = -1;

	this.addName = function () {
		this.nameAdding = true;
		this.nameEditingIndex = -1;
		this.$delay(function () {
			this.$find("form input[name='addingNameName']").focus();
		});
	};

	this.editName = function (index) {
		this.nameEditingIndex = index;
		this.addingNameName = this.names[index];
		this.nameAdding = true;
		this.$delay(function () {
			this.$find("form input[name='addingNameName']").focus();
		});
	};

	this.confirmAddName = function () {
		this.addingNameName = this.addingNameName.trim();
		if (this.addingNameName.length == 0) {
			alert("文件名不能为空");
			this.$find("form input[name='addingNameName']").focus();
			return;
		}
		if (this.nameEditingIndex > -1) {
			this.names[this.nameEditingIndex] = this.addingNameName;
		} else {
			this.names.push(this.addingNameName);
		}
		this.cancelNameAdding();
	};

	this.cancelNameAdding = function () {
		this.nameAdding = false;
		this.addingNameName = "";
		this.nameEditingIndex = -1;
	};

	this.removeName = function (index) {
		this.cancelNameAdding();
		this.names.$remove(index);
	};

	/**
	 * 监听地址
	 */
	this.listens = [];
	this.listenAdding = false;
	this.addingListenName = "";
	this.editingListenIndex = -1;

	this.addListen = function () {
		this.listenAdding = true;
		this.editingListenIndex = -1;
		this.$delay(function () {
			this.$find("form input[name='addingListenName']").focus();
		});
	};

	this.editListen = function (index) {
		this.listenAdding = true;
		this.editingListenIndex = index;
		this.$delay(function () {
			this.$find("form input[name='addingListenName']").focus();
		});
		this.addingListenName = this.listens[index];
	};

	this.confirmAddListen = function () {
		this.addingListenName = this.addingListenName.trim();
		if (this.addingListenName.length == 0) {
			alert("文件名不能为空");
			this.$find("form input[name='addingListenName']").focus();
			return;
		}
		if (this.editingListenIndex > -1) {
			this.listens[this.editingListenIndex] = this.addingListenName;
		} else {
			this.listens.push(this.addingListenName);
		}
		this.cancelListenAdding();
	};

	this.cancelListenAdding = function () {
		this.listenAdding = false;
		this.addingListenName = "";
		this.editingListenIndex = -1;
	};

	this.removeListen = function (index) {
		this.listens.$remove(index);
		this.cancelListenAdding();
	};

	this.nextListen = function () {
		if (this.listens.length == 0) {
			alert("必须添加一个绑定的网络地址");
			this.addListen();
			return;
		}
		this.go("type");
	};

	/**
	 * 服务类型
	 */
	this.nextType = function () {
		if (this.serverType == "proxy") {
			this.go("backend");
		} else if (this.serverType == "static") {
			this.go("root");
			this.$delay(function () {
				this.$find("form input[name='root']").focus();
			});
		}
	};

	/**
	 * 后端服务器地址
	 */
	this.backends = [];
	this.backendAdding = false;
	this.addingBackendName = "";
	this.editingBackendIndex = -1;

	this.addBackend = function () {
		this.backendAdding = true;
		this.editingBackendIndex = -1;
		this.$delay(function () {
			this.$find("form input[name='addingBackendName']").focus();
		});
	};

	this.editBackend = function (index) {
		this.backendAdding = true;
		this.editingBackendIndex = index;
		this.$delay(function () {
			this.$find("form input[name='addingBackendName']").focus();
		});
		this.addingBackendName = this.backends[index];
	};

	this.confirmAddBackend = function () {
		this.addingBackendName = this.addingBackendName.trim();
		if (this.addingBackendName.length == 0) {
			alert("文件名不能为空");
			this.$find("form input[name='addingBackendName']").focus();
			return;
		}
		if (this.editingBackendIndex > -1) {
			this.backends[this.editingBackendIndex] = this.addingBackendName;
		} else {
			this.backends.push(this.addingBackendName);
		}
		this.cancelBackendAdding();
	};

	this.cancelBackendAdding = function () {
		this.backendAdding = false;
		this.addingBackendName = "";
		this.editingBackendIndex = -1;
	};

	this.removeBackend = function (index) {
		this.backends.$remove(index);
		this.cancelBackendAdding();
	};

	this.nextBackend = function () {
		this.go("finish");
	};

	/**
	 * 根目录
	 */
	this.root = "";
	this.nextRoot = function () {
		this.root = this.$find("form input[name='root']").val().trim();
		this.go("finish");
	};
});