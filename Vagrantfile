# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/trusty64"
  config.ssh.insert_key = false


  config.vm.define "player-api-dev" do |dev|
    dev.vm.hostname = "player-api-dev"
    dev.vm.network "private_network", ip: "192.168.50.4"

    #Provision Database
    dev.vm.provision "database-provision", type:'ansible' do |ansible|
      ansible.playbook = "ansible/database-provision.yml"
      ansible.inventory_path = "ansible/inventories/dev"
      ansible.verbose = true
      ansible.config_file = "ansible/ansible.cfg"
      ansible.become = true
    end

    #Provision API
    dev.vm.provision "api-provision", type:'ansible' do |ansible|
      ansible.playbook = "ansible/api-provision.yml"
      ansible.inventory_path = "ansible/inventories/dev"
      ansible.verbose = true
      ansible.config_file = "ansible/ansible.cfg"
      ansible.become = true
    end
  end
end
