using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FramboJSe_Test.App_Code.Serializers.Base
{
    /// <summary>
    /// Base Response for services.
    /// </summary>
    [System.SerializableAttribute()]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true)]
    [System.Xml.Serialization.XmlRootAttribute(Namespace = "", IsNullable = false)]
    public class Response
    {
        protected ResponseResult resultField;
        protected ResponseData dataField;
        protected string idField;

        /// <summary>
        /// Result Node.
        /// </summary>
        public ResponseResult Result
        {
            get {
                return this.resultField;
            }
            set {
                this.resultField = value;
            }
        }
        /// <summary>
        /// Data Node
        /// </summary>
        public ResponseData Data
        {
            get {
                return this.dataField;
            }
            set {
                this.dataField = value;
            }
        }
        /// <summary>
        ///  Response id attribute (copy from request id...)
        /// </summary>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string ID
        {
            get {
                return this.idField;
            }
            set {
                this.idField = value;
            }
        }
    }

    /// <summary>
    /// Response RESULT Node.
    /// </summary>
    [System.SerializableAttribute()]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true)]
    public class ResponseResult
    {

        protected int _codice = 0;
        protected string _descrizione = "";

        public int Codice
        {
            get {
                return this._codice;
            }
            set {
                this._codice = value;
            }
        }
        public string Descrizione
        {
            get {
                return this._descrizione;
            }
            set {
                this._descrizione = value;
            }
        }
    }

    /// <summary>
    /// Response DATA node.
    /// </summary>
    [System.SerializableAttribute()]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true)]
    public class ResponseData
    {

    }

    /// <summary>
    /// Classe rappresentativa di un "valore" xml, inteso come:
    /// - valore ulong (normalizzato intero per la virgola), indicante il valore;
    /// - attributo (R-W), indicante se in pagina il valore potrà essere modificabile (W) oppure read-only (R)
    /// </summary>
    [System.SerializableAttribute()]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true)]
    public class ValueNode
    {
        public enum STATUS
        {
            OK = 0,
            EMPTY_VALUES = 1,
            ERROR = 2,
            WARNING = 3,
            N_A = 10
        }

        private string _tipo;
        private long _value;
        private byte _status = 0;

        public ValueNode() { }
        public ValueNode(string tipo, long value, STATUS status)
        {
            this._tipo = tipo;
            this._value = value;
            this._status = (byte)status;
        }

        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string Tipo
        {
            get {
                return this._tipo;
            }
            set {
                this._tipo = value;
            }
        }

        [System.Xml.Serialization.XmlTextAttribute()]
        public long Value
        {
            get {
                return this._value;
            }
            set {
                this._value = value;
            }
        }

        [System.Xml.Serialization.XmlAttributeAttribute()]
        public byte Status
        {
            get {
                return this._status;
            }
            set {
                this._status = value;
            }
        }
    }


}