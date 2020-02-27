using System.IO;
using System.Web.Services;
using System.Xml.Serialization;

namespace FramboJSe_Test.ws
{
    /// <summary>
    /// Servizio Dati Generali (Login).
    /// Serve per l'accesso all'applicazione.
    /// </summary>
    [WebService(Namespace = "http://yeap.local/public/ws")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    [System.Web.Script.Services.ScriptService]
    public class General : Base
    {

        // xsd const paths
        private const string XSD_GENERAL_SET = "~/public/ws/xsd/General_SET.xsd";


        [WebMethod]
        public string Set(string data)
        {
            App_Code.Serializers.General_SET.Response response = new App_Code.Serializers.General_SET.Response();
            XmlSerializer serOUT = new XmlSerializer(typeof(App_Code.Serializers.General_SET.Response));
            System.Text.StringBuilder sbxmlOut = new System.Text.StringBuilder();
            StringWriter rdr_out = new StringWriter(sbxmlOut);

            App_Code.Serializers.Base.ResponseResult xml_result = this.validaXML(data, XSD_GENERAL_SET);

            if (xml_result.Codice != 0)
            {
                response.Data = null;
                response.Result = xml_result;

                serOUT.Serialize(rdr_out, response);

                return sbxmlOut.ToString();
            }

            var rdr = new StringReader(data);
            XmlSerializer serIN = new XmlSerializer(typeof(App_Code.Serializers.General_SET.Request));
            App_Code.Serializers.General_SET.Request dataIN = (App_Code.Serializers.General_SET.Request)serIN.Deserialize(rdr);

            response = this.getResponse_SET(dataIN);

            serOUT.Serialize(rdr_out, response);

            return sbxmlOut.ToString();
        }



        #region Private Methods 

        private App_Code.Serializers.General_SET.Response getResponse_SET(App_Code.Serializers.General_SET.Request dataIN)
        {
            string str_token = dataIN.General.Token;
            var response = new App_Code.Serializers.General_SET.Response();
            var result = new App_Code.Serializers.Base.ResponseResult();

            return response;
        }

        #endregion

    }

}
