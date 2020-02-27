<%@ Page Title="" Language="C#" MasterPageFile="~/private/aspx/Main.pvt.Master" AutoEventWireup="true" CodeBehind="master.home.pvt.aspx.cs" Inherits="FramboJSe_Test.Pages.master_home_pvt" %>

<asp:Content ID="Content1" ContentPlaceHolderID="cph_head" runat="server">
    <script type="text/javascript">
		
		SystemJS.import('router').then(function(router) {
			router.init({
                Sector: 'homePage'
			});
		});

    </script>
</asp:Content>

<asp:Content ID="c_sitemap" ContentPlaceHolderID="cph_sitemap" runat="server">
	<section id="siteMap"></section>
</asp:Content>

<asp:Content ID="c_dashboard" ContentPlaceHolderID="cph_dashboard" runat="server">
	<section id="dashboard"></section>
</asp:Content>

<asp:Content ID="c_pageBody" ContentPlaceHolderID="cph_pageBody" runat="server">
	<section id="pageContent" class="default margin-b-50 clearfix">		
		<div id="menuContainer"></div>
		<div id="mainContainer">
			<div id="pageContainer" class="container default padding-t-30 margin-t-30 margin-b-50">
				<h1>Homepage </h1>
				<p class="margin-t-100">Prova senza pagina aspx</p>
			</div>
		</div>
	    <script type="text/javascript" src="/System/3rd-parties/jquery-ui/jquery-ui.min.js"></script>
	</section>
</asp:Content>
