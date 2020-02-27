using System;
using System.Text;
using System.Web;
using System.Web.Services;
using System.Xml;
using System.Xml.Schema;

namespace FramboJSe_Test.ws
{
    /// <summary>
    /// Web Service "base" di tutti i web services di Yeap.
    /// </summary>
    [WebService(Namespace = "http://yeap.local/public/ws")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    [System.Web.Script.Services.ScriptService]
    public class Base : System.Web.Services.WebService
    {
        #region Costanti operazioni per abilitazioni utenti 

        protected const int OP_GENERICA = 0;
        protected const int OP_CONFIGURAZIONE = 1;
        protected const int OP_GESTIONE = 2;

        #endregion

        // scale factor value
        protected const int SCALE_VALUES = 1000;    // scale factor for input/output values...
        protected const int DECIMAL_VALUES = 0;     // decimal values for scaling output values



        [WebMethod(EnableSession = true)]
        public string AAA_Echo(string testo)
        {

            System.Text.StringBuilder output = new System.Text.StringBuilder();
            output.Append("Yeap Server " + this.getVersion()).Append(" - ");
            output.Append("Richiesta Echo inviata in data " + this.Context.Timestamp.ToString()).Append(" - ");
            output.Append("Testo inviato : " + "*" + testo + "*").Append(" - ");

            return output.ToString();
        }

        protected string getVersion()
        {
            string location = System.Reflection.Assembly.GetExecutingAssembly().Location;
            string data = System.IO.File.GetLastWriteTime(location).ToShortDateString();

            string strVersion =
                System.Diagnostics.FileVersionInfo.GetVersionInfo(location).FileMajorPart.ToString("0") +
                "." +
                System.Diagnostics.FileVersionInfo.GetVersionInfo(location).FileMinorPart.ToString("0") +
                "." +
                System.Diagnostics.FileVersionInfo.GetVersionInfo(location).FileBuildPart.ToString("0");

            return strVersion + " [" + data + "]";
        }
        /// <summary>
        /// Validazione XML con schema.
        /// </summary>
        /// <param name="strxmlIN">stringa corrispondente al file xml</param>
        /// <param name="schemapath">percorso dello schema xsd</param>
        /// <returns>risultato validazione</returns>
        protected App_Code.Serializers.Base.ResponseResult validaXML(string strxmlIN, string schemapath)
        {
            XmlDocument xmlIN = new XmlDocument();
            App_Code.Serializers.Base.ResponseResult result = new App_Code.Serializers.Base.ResponseResult();
            result.Codice = 0;

            if (strxmlIN.Length > 0)
            {
                // leggo l'xml...

                try
                {
                    xmlIN.LoadXml(strxmlIN);
                }
                catch
                {
                    xmlIN = null;
                    result.Codice = 0;
                    result.Descrizione =null;
                }

                if (xmlIN != null)
                {
                    // lo valido con lo schema xsd ...
                    string schemafile = HttpContext.Current.ApplicationInstance.Server.MapPath(schemapath);
                    XmlTextReader schemaReader = new XmlTextReader(schemafile);
                    System.Text.StringBuilder validMsg = new StringBuilder();
                    XmlSchema schema = XmlSchema.Read(schemaReader, (sender, args) =>
                    {
                        if (args.Severity == XmlSeverityType.Error)
                            validMsg.Append("ERROR:").Append(
                                args.Message).Append("\n");
                    });
                    xmlIN.Schemas.Add(schema);
                    xmlIN.Validate((sender, args) =>
                    {
                        if (args.Severity == XmlSeverityType.Error)
                            validMsg.Append("ERROR:").Append(args.Message).Append("\n");
                    });

                    if (validMsg.Length > 0)
                    {
                        // errori di validazione
                        result.Codice = 0;
                        result.Descrizione = "errori di validazione";
                    }
                }
            }
            else
            {
                xmlIN = null;
                result.Codice = 0;
                result.Descrizione = null;
            }

            return result;
        }


        /// <summary>
        /// Codifica del testo con i caratteri di escape...
        /// </summary>
        /// <param name="instr">il testo da encodare</param>
        /// <returns></returns>
        protected string xmlEscape(string instr)
        {
            if (String.IsNullOrEmpty(instr))
                return "";

            return Uri.EscapeDataString(instr);
        }


        /// <summary>
        /// It makes rawValue bigger of a factor specified by SCALE_VALUES constant (useful for GET methods).
        /// if type of rawValue is one of floating point types, then rawValue is rounded of a number of digits specified by DECIMAL_VALUES constant.
        /// </summary>
        /// <param name="rawValue"></param>
        /// <returns></returns>
        protected long scaling4Get(object rawValue)
        {
            if (rawValue == null) return 0;

            if (rawValue.GetType() == typeof(double))
            {
                double dValue = (double)rawValue;
                return (long)Math.Round(dValue * SCALE_VALUES, DECIMAL_VALUES);
            }
            if (rawValue.GetType() == typeof(decimal))
            {
                decimal dValue = (decimal)rawValue;
                return (long)(Math.Round(dValue * SCALE_VALUES, DECIMAL_VALUES));
            }
            if (rawValue.GetType() == typeof(Int32))
            {
                Int32 iValue = (Int32)rawValue;
                return (long)iValue * SCALE_VALUES;
            }
            if (rawValue.GetType() == typeof(byte))
            {
                byte bValue = (byte)rawValue;
                return (long)bValue * SCALE_VALUES;
            }

            return (long)rawValue * SCALE_VALUES;
        }
        /// <summary>
        /// It makes rawValue smaller of a factor specified by SCALE_VALUES constant (useful for SET methods).
        /// </summary>
        /// <param name="rawValue"></param>
        /// <returns></returns>
        protected decimal scaling4Set(long rawValue)
        {
            return (decimal)rawValue / SCALE_VALUES;
        }
        /// <summary>
        /// Get Field Status (based on last compile).
        /// </summary>
        /// <param name="messaggi">messages array where we are searching in...</param>
        /// <param name="field_code">field code to find</param>
        /// <returns>status ok if there is no message corresponding to field_code, corresponding status if there is a message</returns>
        

    }
}
